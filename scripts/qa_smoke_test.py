#!/usr/bin/env python3
"""QA Smoke Test for Quiz Battle Arena"""

from playwright.sync_api import sync_playwright
import time

def run_smoke_test():
    print("=== QA SMOKE TEST ===\n")

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Capture console logs
        console_logs = []
        page.on("console", lambda msg: console_logs.append(f"[{msg.type}] {msg.text}"))

        # Navigate to game
        print("1. Navigating to http://localhost:3336...")
        page.goto('http://localhost:3336')
        page.wait_for_load_state('networkidle')
        time.sleep(2)  # Wait for Phaser to initialize

        # Take initial screenshot
        page.screenshot(path='/tmp/qa_smoke_1_initial.png', full_page=True)
        print("   Screenshot saved: /tmp/qa_smoke_1_initial.png")

        # Check for canvas (Phaser game)
        canvas = page.locator('canvas')
        if canvas.count() > 0:
            print("   ✅ Phaser canvas found")
        else:
            print("   ❌ No canvas found - game may not have loaded")
            browser.close()
            return False

        # Wait for game to fully load
        time.sleep(3)
        page.screenshot(path='/tmp/qa_smoke_2_loaded.png', full_page=True)
        print("   Screenshot saved: /tmp/qa_smoke_2_loaded.png")

        # Get canvas dimensions
        canvas_box = canvas.first.bounding_box()
        print(f"   Canvas size: {canvas_box['width']}x{canvas_box['height']}")

        # Try clicking on the grid to place a plant (column 1, lane 1)
        # Grid starts at column 1 (column 0 is house)
        # Need to click on a valid grid cell
        print("\n2. Testing plant placement...")

        # Calculate grid position (approximate - based on typical grid layout)
        # Game is 800x600, grid is 3 lanes x 9 columns
        # Click around middle of the playable area
        grid_x = canvas_box['x'] + 200  # Around column 2
        grid_y = canvas_box['y'] + 300  # Middle lane

        page.mouse.click(grid_x, grid_y)
        time.sleep(1)
        page.screenshot(path='/tmp/qa_smoke_3_after_click.png', full_page=True)
        print("   Screenshot saved: /tmp/qa_smoke_3_after_click.png")

        # Wait and observe zombie spawning
        print("\n3. Waiting for zombies to spawn...")
        time.sleep(5)
        page.screenshot(path='/tmp/qa_smoke_4_zombies.png', full_page=True)
        print("   Screenshot saved: /tmp/qa_smoke_4_zombies.png")

        # Wait more to see wave progression
        print("\n4. Observing gameplay for 10 seconds...")
        time.sleep(10)
        page.screenshot(path='/tmp/qa_smoke_5_gameplay.png', full_page=True)
        print("   Screenshot saved: /tmp/qa_smoke_5_gameplay.png")

        # Print console logs
        print("\n5. Console logs:")
        for log in console_logs[-20:]:  # Last 20 logs
            print(f"   {log}")

        # Check for errors
        errors = [log for log in console_logs if 'error' in log.lower()]
        if errors:
            print(f"\n   ⚠️ Found {len(errors)} error(s) in console")
        else:
            print("\n   ✅ No errors in console")

        browser.close()
        print("\n=== SMOKE TEST COMPLETE ===")
        print("Review screenshots in /tmp/qa_smoke_*.png")
        return True

if __name__ == "__main__":
    run_smoke_test()
