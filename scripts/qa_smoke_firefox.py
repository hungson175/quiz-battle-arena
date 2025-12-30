#!/usr/bin/env python3
"""QA Smoke Test - Firefox (better WebGL support in headless)"""

from playwright.sync_api import sync_playwright
import time

def run_smoke_test():
    print("=== QA SMOKE TEST (Firefox) ===\n")

    with sync_playwright() as p:
        browser = p.firefox.launch(headless=True)
        context = browser.new_context(viewport={'width': 960, 'height': 600})
        page = context.new_page()

        console_logs = []
        page.on("console", lambda msg: console_logs.append(f"[{msg.type}] {msg.text}"))

        print("1. Navigating to game...")
        page.goto('http://localhost:3336')
        page.wait_for_load_state('networkidle')
        time.sleep(4)

        page.screenshot(path='/tmp/qa_ff_1.png')
        print("   Screenshot: /tmp/qa_ff_1.png")

        # Check canvas
        canvas = page.locator('canvas')
        print(f"   Canvas: {canvas.count() > 0}")

        # Wait for game
        time.sleep(5)
        page.screenshot(path='/tmp/qa_ff_2.png')

        # Click to place plants
        print("\n2. Testing plant placement...")
        box = canvas.first.bounding_box()
        if box:
            page.mouse.click(box['x'] + 200, box['y'] + 270)
            time.sleep(1)
            page.mouse.click(box['x'] + 300, box['y'] + 150)
            time.sleep(1)

        page.screenshot(path='/tmp/qa_ff_3.png')

        # Observe
        print("\n3. Observing 15s...")
        time.sleep(15)
        page.screenshot(path='/tmp/qa_ff_4.png')

        print("\n4. Console errors:")
        errors = [l for l in console_logs if 'error' in l.lower()]
        print(f"   {len(errors)} errors" if errors else "   None")

        browser.close()
        print("\n=== DONE ===")

if __name__ == "__main__":
    run_smoke_test()
