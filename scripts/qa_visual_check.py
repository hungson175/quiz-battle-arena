#!/usr/bin/env python3
"""QA Visual Check - Capture console errors and game state"""

from playwright.sync_api import sync_playwright
import time

def check_visual():
    print("=== QA VISUAL CHECK ===\n")

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Capture ALL console messages
        console_logs = []
        page.on("console", lambda msg: console_logs.append(f"[{msg.type}] {msg.text}"))

        # Capture errors
        errors = []
        page.on("pageerror", lambda err: errors.append(str(err)))

        print("1. Navigating to http://localhost:3336...")
        page.goto('http://localhost:3336')
        page.wait_for_load_state('networkidle')
        time.sleep(5)  # Wait for game to initialize

        # Check for JavaScript errors
        print("\n2. JavaScript Errors:")
        if errors:
            for err in errors:
                print(f"   ERROR: {err}")
        else:
            print("   No page errors")

        # Check console for game-related messages
        print("\n3. Console Logs (game-related):")
        game_logs = [log for log in console_logs if any(kw in log.lower() for kw in
            ['error', 'warn', 'zombie', 'plant', 'game', 'scene', 'phaser', 'manager', 'config', 'load'])]
        for log in game_logs[:30]:
            print(f"   {log}")

        # Try to evaluate game state
        print("\n4. Game State Check:")
        try:
            game_state = page.evaluate('''() => {
                try {
                    // Check if Phaser game exists
                    if (typeof Phaser === 'undefined') {
                        return { error: 'Phaser not loaded' };
                    }

                    // Look for game instance
                    const gameCanvas = document.querySelector('canvas');
                    if (!gameCanvas) {
                        return { error: 'No canvas found' };
                    }

                    return {
                        canvasFound: true,
                        canvasWidth: gameCanvas.width,
                        canvasHeight: gameCanvas.height,
                        phaserVersion: typeof Phaser !== 'undefined' ? Phaser.VERSION : 'unknown'
                    };
                } catch(e) {
                    return { error: e.toString() };
                }
            }''')
            print(f"   {game_state}")
        except Exception as e:
            print(f"   Error evaluating: {e}")

        # Check for any fetch/load errors
        print("\n5. All Console Warnings/Errors:")
        warn_err = [log for log in console_logs if '[warn' in log.lower() or '[error' in log.lower()]
        for log in warn_err[:20]:
            print(f"   {log}")

        browser.close()
        print("\n=== CHECK COMPLETE ===")

if __name__ == "__main__":
    check_visual()
