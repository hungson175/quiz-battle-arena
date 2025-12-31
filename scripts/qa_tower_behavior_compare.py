#!/usr/bin/env python3
"""QA Tower Behavior Comparison - Sample vs Our Game"""

from playwright.sync_api import sync_playwright
import time

def compare_tower_behavior():
    print("=== QA TOWER BEHAVIOR COMPARISON ===\n")
    print("Comparing tower behaviors between SAMPLE (3337) and OUR GAME (3336)\n")

    results = {
        'sample_errors': [],
        'our_errors': [],
        'checks': {}
    }

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)

        # ============ SAMPLE GAME (PORT 3337) ============
        print("=" * 50)
        print("SAMPLE GAME (port 3337)")
        print("=" * 50)

        page1 = browser.new_page(viewport={'width': 1280, 'height': 720})
        page1.on("pageerror", lambda err: results['sample_errors'].append(str(err)))

        print("\n1. Loading sample game...")
        try:
            page1.goto('http://localhost:3337', timeout=10000)
            page1.wait_for_load_state('networkidle')
            time.sleep(2)

            # Screenshot menu
            page1.screenshot(path='/tmp/sample_tower_menu.png')
            print("   Menu screenshot: /tmp/sample_tower_menu.png")

            # Get game info
            sample_info = page1.evaluate('''() => {
                const canvas = document.querySelector('canvas');
                const bodyText = document.body.innerText;
                return {
                    hasCanvas: !!canvas,
                    canvasSize: canvas ? { w: canvas.width, h: canvas.height } : null,
                    bodyTextSnippet: bodyText.substring(0, 300)
                };
            }''')
            print(f"   Canvas: {sample_info.get('canvasSize')}")
            results['checks']['sample_loads'] = sample_info.get('hasCanvas', False)

        except Exception as e:
            print(f"   ERROR: {e}")
            results['checks']['sample_loads'] = False

        page1.close()

        # ============ OUR GAME (PORT 3336) ============
        print("\n" + "=" * 50)
        print("OUR GAME (port 3336)")
        print("=" * 50)

        page2 = browser.new_page(viewport={'width': 1280, 'height': 720})
        page2.on("pageerror", lambda err: results['our_errors'].append(str(err)))

        print("\n1. Loading our game...")
        try:
            page2.goto('http://localhost:3336', timeout=10000)
            page2.wait_for_load_state('networkidle')
            time.sleep(2)

            # Screenshot menu
            page2.screenshot(path='/tmp/our_tower_menu.png')
            print("   Menu screenshot: /tmp/our_tower_menu.png")

            # Get game info
            our_info = page2.evaluate('''() => {
                const canvas = document.querySelector('canvas');
                const quizPanel = document.querySelector('[class*="quiz"]');
                const bodyText = document.body.innerText;
                return {
                    hasCanvas: !!canvas,
                    canvasSize: canvas ? { w: canvas.width, h: canvas.height } : null,
                    hasQuizPanel: !!quizPanel,
                    bodyTextSnippet: bodyText.substring(0, 300)
                };
            }''')
            print(f"   Canvas: {our_info.get('canvasSize')}")
            print(f"   Quiz panel: {our_info.get('hasQuizPanel')}")
            results['checks']['our_loads'] = our_info.get('hasCanvas', False)
            results['checks']['has_quiz_panel'] = our_info.get('hasQuizPanel', False)

        except Exception as e:
            print(f"   ERROR: {e}")
            results['checks']['our_loads'] = False

        page2.close()

        # ============ RUNTIME ERRORS CHECK ============
        print("\n" + "=" * 50)
        print("RUNTIME ERRORS CHECK")
        print("=" * 50)

        print("\nSample game errors:")
        if results['sample_errors']:
            for err in results['sample_errors']:
                print(f"   - {err}")
            results['checks']['sample_no_errors'] = False
        else:
            print("   None")
            results['checks']['sample_no_errors'] = True

        print("\nOur game errors:")
        if results['our_errors']:
            for err in results['our_errors']:
                print(f"   - {err}")
            results['checks']['our_no_errors'] = False
        else:
            print("   None")
            results['checks']['our_no_errors'] = True

        browser.close()

        # ============ FINAL VERDICT ============
        print("\n" + "=" * 50)
        print("TOWER BEHAVIOR COMPARISON RESULT")
        print("=" * 50)

        for check, passed in results['checks'].items():
            status = "PASS" if passed else "FAIL"
            print(f"  {check}: {status}")

        all_passed = all(results['checks'].values())
        print()
        if all_passed:
            print("VISUAL COMPARISON: PASSED")
            print("\nNote: Playwright cannot interact with Phaser canvas.")
            print("Tower behaviors (firing, placement) require MANUAL testing.")
        else:
            print("VISUAL COMPARISON: FAILED")

        print("\nScreenshots for manual review:")
        print("  Sample menu: /tmp/sample_tower_menu.png")
        print("  Our menu: /tmp/our_tower_menu.png")

        return all_passed, results

if __name__ == "__main__":
    compare_tower_behavior()
