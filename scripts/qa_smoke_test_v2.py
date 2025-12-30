#!/usr/bin/env python3
"""QA Smoke Test for Quiz Battle Arena - with visible browser"""

from playwright.sync_api import sync_playwright
import time

def run_smoke_test():
    print("=== QA SMOKE TEST v2 ===\n")

    with sync_playwright() as p:
        # Use chromium with GPU disabled for headless WebGL
        browser = p.chromium.launch(
            headless=True,
            args=['--disable-gpu', '--disable-software-rasterizer']
        )
        context = browser.new_context(viewport={'width': 960, 'height': 540})
        page = context.new_page()

        # Capture console logs
        console_logs = []
        page.on("console", lambda msg: console_logs.append(f"[{msg.type}] {msg.text}"))

        # Navigate to game
        print("1. Navigating to http://localhost:3336...")
        page.goto('http://localhost:3336')
        page.wait_for_load_state('networkidle')
        time.sleep(3)  # Wait for Phaser to initialize

        # Check for canvas
        canvas = page.locator('canvas')
        canvas_count = canvas.count()
        print(f"   Canvas elements found: {canvas_count}")

        # Get page title and check HTML content for game info
        title = page.title()
        print(f"   Page title: {title}")

        # Try to get any text content that might indicate game state
        # For Phaser games, we need to look at the game state differently

        # Let's check if the game script loaded the config correctly
        game_info = page.evaluate('''() => {
            if (typeof window.game !== 'undefined') {
                return {
                    exists: true,
                    width: window.game.config ? window.game.config.width : 'unknown',
                    height: window.game.config ? window.game.config.height : 'unknown',
                    scene: window.game.scene ? window.game.scene.keys : []
                };
            }
            return { exists: false };
        }''')
        print(f"   Game object: {game_info}")

        # Try to access game scene and check money
        game_state = page.evaluate('''() => {
            try {
                if (window.game && window.game.scene) {
                    const scenes = window.game.scene.scenes;
                    for (let scene of scenes) {
                        if (scene.moneyManager) {
                            return {
                                sceneName: scene.constructor.name,
                                money: scene.moneyManager.getMoney ? scene.moneyManager.getMoney() : 'unknown',
                                hasWaveManager: !!scene.waveManager,
                                hasPlantManager: !!scene.plantManager,
                                hasZombieManager: !!scene.zombieManager
                            };
                        }
                    }
                }
                return { error: 'No active game scene with moneyManager found' };
            } catch(e) {
                return { error: e.toString() };
            }
        }''')
        print(f"   Game state: {game_state}")

        # Wait a bit and check wave status
        print("\n2. Waiting 5 seconds to check wave progress...")
        time.sleep(5)

        wave_state = page.evaluate('''() => {
            try {
                if (window.game && window.game.scene) {
                    const scenes = window.game.scene.scenes;
                    for (let scene of scenes) {
                        if (scene.waveManager) {
                            return {
                                currentWave: scene.waveManager.currentWave,
                                totalWaves: scene.waveManager.totalWaves,
                                waveInProgress: scene.waveManager.waveInProgress,
                                zombieCount: scene.zombieManager ? scene.zombieManager.zombies.length : 0,
                                plantCount: scene.plantManager ? scene.plantManager.plants.length : 0
                            };
                        }
                    }
                }
                return { error: 'No waveManager found' };
            } catch(e) {
                return { error: e.toString() };
            }
        }''')
        print(f"   Wave state: {wave_state}")

        # Try clicking to place a plant
        print("\n3. Attempting to place a plant...")
        canvas_box = canvas.first.bounding_box()
        if canvas_box:
            # Click on column 2, lane 2 (middle area)
            click_x = canvas_box['x'] + 200
            click_y = canvas_box['y'] + 270
            page.mouse.click(click_x, click_y)
            time.sleep(1)

            # Check game state after click
            state_after_click = page.evaluate('''() => {
                try {
                    if (window.game && window.game.scene) {
                        const scenes = window.game.scene.scenes;
                        for (let scene of scenes) {
                            if (scene.moneyManager) {
                                return {
                                    money: scene.moneyManager.getMoney ? scene.moneyManager.getMoney() : 'unknown',
                                    plantCount: scene.plantManager ? scene.plantManager.plants.length : 0
                                };
                            }
                        }
                    }
                    return { error: 'No scene found' };
                } catch(e) {
                    return { error: e.toString() };
                }
            }''')
            print(f"   State after click: {state_after_click}")

        # Wait and observe for 10 more seconds
        print("\n4. Observing gameplay for 15 seconds...")
        time.sleep(15)

        final_state = page.evaluate('''() => {
            try {
                if (window.game && window.game.scene) {
                    const scenes = window.game.scene.scenes;
                    for (let scene of scenes) {
                        if (scene.waveManager) {
                            return {
                                currentWave: scene.waveManager.currentWave,
                                totalWaves: scene.waveManager.totalWaves,
                                zombieCount: scene.zombieManager ? scene.zombieManager.zombies.length : 0,
                                plantCount: scene.plantManager ? scene.plantManager.plants.length : 0,
                                money: scene.moneyManager ? scene.moneyManager.getMoney() : 'unknown',
                                gameOver: scene.gameOver || false,
                                victory: scene.victory || false
                            };
                        }
                    }
                }
                return { error: 'No waveManager found' };
            } catch(e) {
                return { error: e.toString() };
            }
        }''')
        print(f"   Final state: {final_state}")

        # Print relevant console logs
        print("\n5. Console logs (filtered):")
        for log in console_logs:
            if 'error' in log.lower() or 'wave' in log.lower() or 'money' in log.lower():
                print(f"   {log}")

        browser.close()
        print("\n=== SMOKE TEST COMPLETE ===")
        return game_state, wave_state, final_state

if __name__ == "__main__":
    run_smoke_test()
