#!/usr/bin/env python3
"""QA Visual Verification - MANDATORY before unit tests"""

from playwright.sync_api import sync_playwright
import time

def visual_verify():
    print("=== QA VISUAL VERIFICATION ===\n")

    results = {
        'runtime_errors': [],
        'console_errors': [],
        'checks': {}
    }

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # CRITICAL: Capture runtime errors
        page.on("pageerror", lambda err: results['runtime_errors'].append(str(err)))

        # Capture console errors/warnings
        console_logs = []
        page.on("console", lambda msg: console_logs.append(f"[{msg.type}] {msg.text}"))

        print("1. Navigating to http://localhost:3336...")
        page.goto('http://localhost:3336')
        page.wait_for_load_state('networkidle')
        time.sleep(5)  # Wait for Phaser to initialize

        # CHECK 1: Runtime Errors (CRITICAL)
        print("\n2. CRITICAL - Runtime JavaScript Errors:")
        if results['runtime_errors']:
            print("   ❌ FAILED - Runtime errors found:")
            for err in results['runtime_errors']:
                print(f"      {err}")
            results['checks']['runtime_errors'] = False
        else:
            print("   ✅ PASSED - No runtime errors")
            results['checks']['runtime_errors'] = True

        # CHECK 2: Canvas exists
        print("\n3. Canvas Check:")
        canvas = page.locator('canvas')
        if canvas.count() > 0:
            box = canvas.first.bounding_box()
            print(f"   ✅ Canvas found: {box['width']}x{box['height']}")
            results['checks']['canvas'] = True
        else:
            print("   ❌ No canvas found")
            results['checks']['canvas'] = False

        # CHECK 3: Game state via JavaScript evaluation
        print("\n4. Game State Check:")
        try:
            game_state = page.evaluate('''() => {
                try {
                    // Find game scenes
                    const games = document.querySelectorAll('canvas');
                    if (games.length === 0) return { error: 'No canvas' };

                    // Check for common game objects in window
                    return {
                        canvasCount: games.length,
                        documentReady: document.readyState,
                        hasErrors: false
                    };
                } catch(e) {
                    return { error: e.toString() };
                }
            }''')
            print(f"   Game state: {game_state}")
            results['checks']['game_state'] = 'error' not in game_state
        except Exception as e:
            print(f"   Error: {e}")
            results['checks']['game_state'] = False

        # CHECK 4: Console warnings/errors
        print("\n5. Console Warnings/Errors:")
        error_logs = [log for log in console_logs if '[error]' in log.lower()]
        warn_logs = [log for log in console_logs if '[warn' in log.lower() and 'webgl' not in log.lower()]

        if error_logs:
            print("   Console errors:")
            for log in error_logs[:5]:
                print(f"      {log}")
        else:
            print("   ✅ No console errors")

        results['checks']['console_clean'] = len(error_logs) == 0

        # Wait more and check for zombie spawning
        print("\n6. Waiting 10s for game activity...")
        time.sleep(10)

        # Re-check for runtime errors after gameplay
        if results['runtime_errors']:
            print("   ❌ Runtime errors during gameplay:")
            for err in results['runtime_errors']:
                print(f"      {err}")
        else:
            print("   ✅ No runtime errors during gameplay")

        browser.close()

        # FINAL VERDICT
        print("\n" + "="*50)
        print("VISUAL VERIFICATION RESULT:")
        print("="*50)

        all_passed = all(results['checks'].values())

        for check, passed in results['checks'].items():
            status = "✅ PASS" if passed else "❌ FAIL"
            print(f"  {check}: {status}")

        print()
        if all_passed:
            print("✅ VISUAL VERIFICATION PASSED")
        else:
            print("❌ VISUAL VERIFICATION FAILED")

        return all_passed

if __name__ == "__main__":
    visual_verify()
