#!/usr/bin/env python3
"""QA Screenshot Comparison - Sample vs Our Game"""

from playwright.sync_api import sync_playwright
import time

def take_screenshots():
    print("=== QA SCREENSHOT COMPARISON ===\n")

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)

        # Screenshot 1: Sample game on port 3337
        print("1. Taking screenshot of SAMPLE game (port 3337)...")
        page1 = browser.new_page(viewport={'width': 1280, 'height': 720})

        errors1 = []
        page1.on("pageerror", lambda err: errors1.append(str(err)))

        try:
            page1.goto('http://localhost:3337', timeout=10000)
            page1.wait_for_load_state('networkidle')
            time.sleep(3)  # Wait for game to initialize

            page1.screenshot(path='/tmp/sample_game.png', full_page=False)
            print("   ✅ Screenshot saved: /tmp/sample_game.png")

            if errors1:
                print(f"   ⚠️ Runtime errors in sample: {errors1}")
        except Exception as e:
            print(f"   ❌ Error: {e}")

        page1.close()

        # Screenshot 2: Our game on port 3336
        print("\n2. Taking screenshot of OUR game (port 3336)...")
        page2 = browser.new_page(viewport={'width': 1280, 'height': 720})

        errors2 = []
        page2.on("pageerror", lambda err: errors2.append(str(err)))

        try:
            page2.goto('http://localhost:3336', timeout=10000)
            page2.wait_for_load_state('networkidle')
            time.sleep(3)  # Wait for game to initialize

            page2.screenshot(path='/tmp/our_game.png', full_page=False)
            print("   ✅ Screenshot saved: /tmp/our_game.png")

            if errors2:
                print(f"   ⚠️ Runtime errors in our game: {errors2}")
        except Exception as e:
            print(f"   ❌ Error: {e}")

        page2.close()

        # Get layout info for both
        print("\n3. Getting layout info...")

        page3 = browser.new_page(viewport={'width': 1280, 'height': 720})
        page3.goto('http://localhost:3337')
        page3.wait_for_load_state('networkidle')
        time.sleep(2)

        sample_info = page3.evaluate('''() => {
            const canvas = document.querySelector('canvas');
            return {
                hasCanvas: !!canvas,
                canvasWidth: canvas ? canvas.width : 0,
                canvasHeight: canvas ? canvas.height : 0,
                bodyWidth: document.body.clientWidth,
                bodyHeight: document.body.clientHeight
            };
        }''')
        print(f"   SAMPLE: {sample_info}")
        page3.close()

        page4 = browser.new_page(viewport={'width': 1280, 'height': 720})
        page4.goto('http://localhost:3336')
        page4.wait_for_load_state('networkidle')
        time.sleep(2)

        our_info = page4.evaluate('''() => {
            const canvas = document.querySelector('canvas');
            const quizPanel = document.querySelector('.quiz-panel, [class*="quiz"]');
            return {
                hasCanvas: !!canvas,
                canvasWidth: canvas ? canvas.width : 0,
                canvasHeight: canvas ? canvas.height : 0,
                hasQuizPanel: !!quizPanel,
                quizPanelWidth: quizPanel ? quizPanel.getBoundingClientRect().width : 0,
                bodyWidth: document.body.clientWidth,
                bodyHeight: document.body.clientHeight
            };
        }''')
        print(f"   OUR GAME: {our_info}")
        page4.close()

        browser.close()

        print("\n=== SCREENSHOTS READY FOR COMPARISON ===")
        print("Sample: /tmp/sample_game.png")
        print("Our game: /tmp/our_game.png")
        print("\nReview these screenshots to compare layout and visual elements.")

        return sample_info, our_info

if __name__ == "__main__":
    take_screenshots()
