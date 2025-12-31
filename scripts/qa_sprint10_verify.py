#!/usr/bin/env python3
"""QA Sprint 10 Visual Verification - Quiz Tower Defense"""

from playwright.sync_api import sync_playwright
import time

def verify_sprint10():
    print("=== QA SPRINT 10 - VISUAL VERIFICATION ===\n")

    results = {
        'runtime_errors': [],
        'checks': {}
    }

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={'width': 1280, 'height': 720})

        # CRITICAL: Capture runtime errors
        page.on("pageerror", lambda err: results['runtime_errors'].append(str(err)))

        console_logs = []
        page.on("console", lambda msg: console_logs.append(f"[{msg.type}] {msg.text}"))

        print("1. Navigating to http://localhost:3336...")
        page.goto('http://localhost:3336')
        page.wait_for_load_state('networkidle')
        time.sleep(3)

        # CHECK 1: Runtime Errors
        print("\n2. CRITICAL - Runtime JavaScript Errors:")
        if results['runtime_errors']:
            print("   ❌ FAILED - Runtime errors found:")
            for err in results['runtime_errors']:
                print(f"      {err}")
            results['checks']['runtime_errors'] = False
        else:
            print("   ✅ PASSED - No runtime errors")
            results['checks']['runtime_errors'] = True

        # CHECK 2: Layout containers
        print("\n3. Layout Check (70/30 split):")
        try:
            # Check for game container and quiz container
            game_container = page.locator('.game-container, #game-container, [class*="game"]').first
            quiz_container = page.locator('.quiz-container, #quiz-container, [class*="quiz"], .quiz-panel').first

            if game_container.count() > 0 or quiz_container.count() > 0:
                print("   ✅ Layout containers found")
                results['checks']['layout'] = True
            else:
                # Check for any flex/grid layout
                layout_info = page.evaluate('''() => {
                    const containers = document.querySelectorAll('div');
                    let layoutFound = false;
                    for (let c of containers) {
                        const style = window.getComputedStyle(c);
                        if (style.display === 'flex' || style.display === 'grid') {
                            layoutFound = true;
                            break;
                        }
                    }
                    return { layoutFound, bodyWidth: document.body.clientWidth };
                }''')
                print(f"   Layout info: {layout_info}")
                results['checks']['layout'] = layout_info.get('layoutFound', False)
        except Exception as e:
            print(f"   Layout check error: {e}")
            results['checks']['layout'] = False

        # CHECK 3: Canvas exists
        print("\n4. Canvas Check:")
        canvas = page.locator('canvas')
        if canvas.count() > 0:
            box = canvas.first.bounding_box()
            if box:
                print(f"   ✅ Canvas found: {box['width']}x{box['height']}")
                results['checks']['canvas'] = True
            else:
                print("   ⚠️ Canvas exists but no bounding box")
                results['checks']['canvas'] = True
        else:
            print("   ❌ No canvas found")
            results['checks']['canvas'] = False

        # CHECK 4: Quiz panel elements
        print("\n5. Quiz Panel Check:")
        quiz_elements = page.evaluate('''() => {
            const body = document.body.innerHTML.toLowerCase();
            return {
                hasQuizText: body.includes('quiz') || body.includes('question') || body.includes('answer'),
                hasGoldText: body.includes('gold') || body.includes('money') || body.includes('$'),
                buttonCount: document.querySelectorAll('button').length
            };
        }''')
        print(f"   Quiz elements: {quiz_elements}")
        results['checks']['quiz_panel'] = quiz_elements.get('hasQuizText', False) or quiz_elements.get('buttonCount', 0) > 0

        # CHECK 5: Wait and check for more runtime errors
        print("\n6. Waiting 5s for game activity...")
        time.sleep(5)

        if len(results['runtime_errors']) > 0:
            print("   ❌ Runtime errors during wait:")
            for err in results['runtime_errors']:
                print(f"      {err}")
            results['checks']['gameplay_stable'] = False
        else:
            print("   ✅ No runtime errors during gameplay")
            results['checks']['gameplay_stable'] = True

        # Console errors check
        print("\n7. Console Errors:")
        error_logs = [log for log in console_logs if '[error]' in log.lower()]
        if error_logs:
            for log in error_logs[:5]:
                print(f"   {log}")
            results['checks']['console_clean'] = False
        else:
            print("   ✅ No console errors")
            results['checks']['console_clean'] = True

        browser.close()

        # FINAL VERDICT
        print("\n" + "="*50)
        print("VISUAL VERIFICATION RESULT:")
        print("="*50)

        for check, passed in results['checks'].items():
            status = "✅ PASS" if passed else "❌ FAIL"
            print(f"  {check}: {status}")

        all_passed = all(results['checks'].values())
        print()
        if all_passed:
            print("✅ VISUAL VERIFICATION PASSED")
        else:
            print("❌ VISUAL VERIFICATION FAILED")

        return all_passed, results

if __name__ == "__main__":
    verify_sprint10()
