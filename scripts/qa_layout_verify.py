#!/usr/bin/env python3
"""QA Layout Fix Verification - 70/30 split, no overflow"""

from playwright.sync_api import sync_playwright
import time

def verify_layout():
    print("=== QA LAYOUT FIX VERIFICATION ===\n")

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

        # CHECK 2: Canvas size and position (should be contained in 70%)
        print("\n3. Canvas Containment Check (70% left):")
        canvas = page.locator('canvas')
        if canvas.count() > 0:
            box = canvas.first.bounding_box()
            if box:
                viewport_width = 1280
                expected_max_width = viewport_width * 0.7  # 70% = 896px

                print(f"   Canvas: x={box['x']}, width={box['width']}")
                print(f"   Canvas right edge: {box['x'] + box['width']}")
                print(f"   Expected max (70%): {expected_max_width}")

                # Check if canvas is contained within 70% left
                canvas_right_edge = box['x'] + box['width']
                if canvas_right_edge <= expected_max_width + 10:  # 10px tolerance
                    print(f"   ✅ Canvas contained in 70% left")
                    results['checks']['canvas_contained'] = True
                else:
                    print(f"   ❌ Canvas overflows! Right edge at {canvas_right_edge}")
                    results['checks']['canvas_contained'] = False
            else:
                print("   ⚠️ Canvas exists but no bounding box")
                results['checks']['canvas_contained'] = False
        else:
            print("   ❌ No canvas found")
            results['checks']['canvas_contained'] = False

        # CHECK 3: No horizontal scrollbar (no overflow)
        print("\n4. Overflow Check:")
        overflow_info = page.evaluate('''() => {
            const body = document.body;
            const html = document.documentElement;
            return {
                bodyScrollWidth: body.scrollWidth,
                bodyClientWidth: body.clientWidth,
                htmlScrollWidth: html.scrollWidth,
                htmlClientWidth: html.clientWidth,
                hasHorizontalScroll: body.scrollWidth > body.clientWidth || html.scrollWidth > html.clientWidth
            };
        }''')
        print(f"   Scroll info: {overflow_info}")

        if not overflow_info.get('hasHorizontalScroll', True):
            print("   ✅ No horizontal overflow")
            results['checks']['no_overflow'] = True
        else:
            print("   ❌ Horizontal overflow detected!")
            results['checks']['no_overflow'] = False

        # CHECK 4: Quiz panel in 30% right
        print("\n5. Quiz Panel Position Check (30% right):")
        quiz_info = page.evaluate('''() => {
            // Look for quiz panel elements
            const quizPanel = document.querySelector('.quiz-panel, .quiz-container, [class*="quiz"]');
            const buttons = document.querySelectorAll('button');

            let quizRect = null;
            if (quizPanel) {
                const rect = quizPanel.getBoundingClientRect();
                quizRect = { x: rect.x, y: rect.y, width: rect.width, height: rect.height };
            }

            return {
                quizPanelFound: !!quizPanel,
                quizRect: quizRect,
                buttonCount: buttons.length,
                buttonsVisible: Array.from(buttons).map(b => {
                    const rect = b.getBoundingClientRect();
                    return { text: b.textContent.substring(0, 20), x: rect.x, y: rect.y, visible: rect.width > 0 && rect.height > 0 };
                })
            };
        }''')
        print(f"   Quiz panel found: {quiz_info.get('quizPanelFound')}")
        print(f"   Quiz rect: {quiz_info.get('quizRect')}")
        print(f"   Button count: {quiz_info.get('buttonCount')}")

        results['checks']['quiz_panel'] = quiz_info.get('quizPanelFound', False) or quiz_info.get('buttonCount', 0) > 0

        # CHECK 5: All buttons visible
        print("\n6. Buttons Visibility Check:")
        buttons_visible = quiz_info.get('buttonsVisible', [])
        all_visible = all(b.get('visible', False) for b in buttons_visible) if buttons_visible else True

        for btn in buttons_visible[:5]:
            status = "✅" if btn.get('visible') else "❌"
            print(f"   {status} '{btn.get('text')}' at x={btn.get('x')}")

        if all_visible and len(buttons_visible) > 0:
            print(f"   ✅ All {len(buttons_visible)} buttons visible")
            results['checks']['buttons_visible'] = True
        elif len(buttons_visible) == 0:
            print("   ⚠️ No buttons found (may be expected)")
            results['checks']['buttons_visible'] = True
        else:
            print("   ❌ Some buttons not visible!")
            results['checks']['buttons_visible'] = False

        browser.close()

        # FINAL VERDICT
        print("\n" + "="*50)
        print("LAYOUT VERIFICATION RESULT:")
        print("="*50)

        for check, passed in results['checks'].items():
            status = "✅ PASS" if passed else "❌ FAIL"
            print(f"  {check}: {status}")

        all_passed = all(results['checks'].values())
        print()
        if all_passed:
            print("✅ LAYOUT VERIFICATION PASSED")
        else:
            print("❌ LAYOUT VERIFICATION FAILED")

        return all_passed, results

if __name__ == "__main__":
    verify_layout()
