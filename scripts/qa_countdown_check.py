#!/usr/bin/env python3
"""QA Check: Verify 10s countdown visible after game start"""

from playwright.sync_api import sync_playwright
import time

def check_countdown():
    print("=== QA CHECK: 10s COUNTDOWN VISIBILITY ===\n")

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={'width': 1280, 'height': 720})

        errors = []
        page.on("pageerror", lambda err: errors.append(str(err)))

        print("1. Navigating to http://localhost:3336...")
        page.goto('http://localhost:3336')
        page.wait_for_load_state('networkidle')
        time.sleep(2)

        # Screenshot before starting game
        page.screenshot(path='/tmp/qa_before_start.png')
        print("   Screenshot: /tmp/qa_before_start.png (menu state)")

        # Try to start the game by clicking Start Game button
        print("\n2. Attempting to start game...")
        start_result = page.evaluate('''() => {
            const buttons = document.querySelectorAll('button');
            for (let btn of buttons) {
                if (btn.textContent.toLowerCase().includes('start game')) {
                    btn.click();
                    return { clicked: true, button: 'Start Game' };
                }
            }
            // Try clicking canvas directly
            const canvas = document.querySelector('canvas');
            if (canvas) {
                canvas.click();
                return { clicked: true, button: 'canvas' };
            }
            return { clicked: false };
        }''')
        print(f"   Start result: {start_result}")

        # Wait a moment for game to transition
        time.sleep(2)

        # Screenshot immediately after start
        page.screenshot(path='/tmp/qa_just_started.png')
        print("   Screenshot: /tmp/qa_just_started.png (just after start)")

        # Check for countdown text
        print("\n3. Checking for countdown text...")
        countdown_info = page.evaluate('''() => {
            const bodyText = document.body.innerText;
            const countdownMatch = bodyText.match(/(\\d+)\\s*(seconds?|s)/i);
            const waveMatch = bodyText.match(/wave/i);

            return {
                bodyText: bodyText.substring(0, 800),
                hasCountdown: !!countdownMatch,
                countdownValue: countdownMatch ? countdownMatch[1] : null,
                hasWaveText: !!waveMatch
            };
        }''')
        print(f"   Countdown detected: {countdown_info.get('hasCountdown')}")
        print(f"   Countdown value: {countdown_info.get('countdownValue')}")
        print(f"   Body text snippet:\n{countdown_info.get('bodyText')}")

        # Take screenshots at intervals to capture countdown
        print("\n4. Taking screenshots during countdown period...")
        for i in range(4):
            time.sleep(3)
            page.screenshot(path=f'/tmp/qa_countdown_{i}.png')

            # Check countdown at each interval
            text = page.evaluate('() => document.body.innerText')
            print(f"   T+{(i+1)*3}s: /tmp/qa_countdown_{i}.png")

            # Look for countdown or wave indicator
            import re
            countdown = re.search(r'(\d+)\s*(seconds?|s)', text, re.I)
            wave = re.search(r'wave\s*(\d+)', text, re.I)
            if countdown:
                print(f"      Countdown: {countdown.group(0)}")
            if wave:
                print(f"      Wave: {wave.group(0)}")

        # Final screenshot
        page.screenshot(path='/tmp/qa_after_countdown.png')
        print("\n   Final screenshot: /tmp/qa_after_countdown.png")

        # Check for runtime errors
        print("\n5. Runtime errors:")
        if errors:
            print("   ERRORS FOUND:")
            for err in errors:
                print(f"      {err}")
        else:
            print("   No runtime errors")

        browser.close()

        print("\n=== SCREENSHOTS READY FOR REVIEW ===")
        print("Menu: /tmp/qa_before_start.png")
        print("Just started: /tmp/qa_just_started.png")
        print("Countdown: /tmp/qa_countdown_0.png through _3.png")
        print("After countdown: /tmp/qa_after_countdown.png")

if __name__ == "__main__":
    check_countdown()
