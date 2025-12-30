#!/usr/bin/env python3
"""QA Smoke Test for Quiz Battle Arena - with software WebGL rendering"""

from playwright.sync_api import sync_playwright
import time
import os

def run_smoke_test():
    print("=== QA SMOKE TEST v3 (Software WebGL) ===\n")

    with sync_playwright() as p:
        # Use software WebGL rendering
        browser = p.chromium.launch(
            headless=True,
            args=[
                '--use-gl=swiftshader',
                '--enable-unsafe-swiftshader',
                '--disable-gpu-sandbox',
                '--ignore-gpu-blocklist'
            ]
        )
        context = browser.new_context(
            viewport={'width': 960, 'height': 600},
            record_video_dir='/tmp/qa_videos'
        )
        page = context.new_page()

        # Capture console logs
        console_logs = []
        page.on("console", lambda msg: console_logs.append(f"[{msg.type}] {msg.text}"))

        # Navigate to game
        print("1. Navigating to http://localhost:3336...")
        page.goto('http://localhost:3336')
        page.wait_for_load_state('networkidle')
        time.sleep(3)  # Wait for Phaser to initialize

        # Take screenshot
        page.screenshot(path='/tmp/qa_v3_1_loaded.png')
        print("   Screenshot: /tmp/qa_v3_1_loaded.png")

        # Check canvas
        canvas = page.locator('canvas')
        print(f"   Canvas found: {canvas.count() > 0}")

        # Wait for game to fully load and start
        print("\n2. Waiting for game to start...")
        time.sleep(5)
        page.screenshot(path='/tmp/qa_v3_2_game.png')
        print("   Screenshot: /tmp/qa_v3_2_game.png")

        # Try clicking to place plants at different positions
        print("\n3. Attempting plant placement...")
        canvas_box = canvas.first.bounding_box()
        if canvas_box:
            # Try multiple clicks in the grid area
            for i, (x_offset, y_offset) in enumerate([(200, 150), (300, 270), (400, 390)]):
                click_x = canvas_box['x'] + x_offset
                click_y = canvas_box['y'] + y_offset
                print(f"   Click {i+1}: ({click_x:.0f}, {click_y:.0f})")
                page.mouse.click(click_x, click_y)
                time.sleep(0.5)

        page.screenshot(path='/tmp/qa_v3_3_after_clicks.png')
        print("   Screenshot: /tmp/qa_v3_3_after_clicks.png")

        # Wait and observe gameplay
        print("\n4. Observing gameplay for 20 seconds...")
        time.sleep(10)
        page.screenshot(path='/tmp/qa_v3_4_mid.png')
        time.sleep(10)
        page.screenshot(path='/tmp/qa_v3_5_final.png')
        print("   Screenshots: /tmp/qa_v3_4_mid.png, /tmp/qa_v3_5_final.png")

        # Print console logs
        print("\n5. Console output:")
        error_count = 0
        for log in console_logs:
            if 'error' in log.lower():
                print(f"   ERROR: {log}")
                error_count += 1

        if error_count == 0:
            print("   No errors in console")

        # Close and save video
        context.close()
        browser.close()

        print("\n=== SMOKE TEST COMPLETE ===")
        print("Check screenshots: /tmp/qa_v3_*.png")
        print("Check video: /tmp/qa_videos/")
        return True

if __name__ == "__main__":
    run_smoke_test()
