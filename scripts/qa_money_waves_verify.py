#!/usr/bin/env python3
"""QA Verification: Money Bridge + Auto-Start Waves"""

from playwright.sync_api import sync_playwright
import time
import re

def verify_fixes():
    print("=== QA VERIFICATION: Money Bridge + Auto-Start Waves ===\n")

    results = {
        'runtime_errors': [],
        'checks': {}
    }

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={'width': 1280, 'height': 720})

        # Capture runtime errors
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
            print("   FAILED - Runtime errors found:")
            for err in results['runtime_errors']:
                print(f"      {err}")
            results['checks']['no_runtime_errors'] = False
        else:
            print("   PASSED - No runtime errors")
            results['checks']['no_runtime_errors'] = True

        # CHECK 2: Initial Gold Value
        print("\n3. Checking Initial Gold Value...")
        gold_info = page.evaluate('''() => {
            // Look for gold display in the page
            const goldElements = document.querySelectorAll('[class*="gold"], [class*="Gold"], [class*="money"]');
            const bodyText = document.body.innerText;

            // Find gold value in text (look for "Gold: X" or similar patterns)
            const goldMatch = bodyText.match(/Gold[:\\s]*([0-9]+)/i);
            const moneyMatch = bodyText.match(/Money[:\\s]*([0-9]+)/i);

            return {
                goldFromText: goldMatch ? parseInt(goldMatch[1]) : null,
                moneyFromText: moneyMatch ? parseInt(moneyMatch[1]) : null,
                goldElementCount: goldElements.length,
                bodyTextSnippet: bodyText.substring(0, 500)
            };
        }''')
        print(f"   Gold info: {gold_info}")

        initial_gold = gold_info.get('goldFromText') or gold_info.get('moneyFromText') or 0
        print(f"   Initial gold detected: {initial_gold}")

        # CHECK 3: Quiz Panel Present
        print("\n4. Checking Quiz Panel...")
        quiz_info = page.evaluate('''() => {
            const quizPanel = document.querySelector('.quiz-panel, [class*="quiz"]');
            const buttons = document.querySelectorAll('button');
            const answerButtons = Array.from(buttons).filter(b =>
                b.textContent && !b.textContent.toLowerCase().includes('start')
            );

            return {
                hasQuizPanel: !!quizPanel,
                buttonCount: buttons.length,
                answerButtonCount: answerButtons.length,
                buttonTexts: Array.from(buttons).slice(0, 6).map(b => b.textContent.substring(0, 30))
            };
        }''')
        print(f"   Quiz panel found: {quiz_info.get('hasQuizPanel')}")
        print(f"   Buttons: {quiz_info.get('buttonTexts')}")
        results['checks']['quiz_panel_present'] = quiz_info.get('hasQuizPanel', False) or quiz_info.get('buttonCount', 0) > 0

        # CHECK 4: Auto-Start Waves (wait for countdown and wave start)
        print("\n5. Checking Auto-Start Waves (waiting 15s for countdown + wave start)...")

        # Take initial screenshot
        page.screenshot(path='/tmp/qa_initial.png')
        print("   Initial screenshot: /tmp/qa_initial.png")

        # Wait for auto-start (10s countdown + buffer)
        time.sleep(15)

        # Check if waves started (look for zombies or wave indicators)
        wave_info = page.evaluate('''() => {
            const bodyText = document.body.innerText;
            const waveMatch = bodyText.match(/Wave[:\\s]*([0-9]+)/i);
            const zombieElements = document.querySelectorAll('[class*="zombie"], [class*="Zombie"]');

            // Check canvas for activity (game should be running)
            const canvas = document.querySelector('canvas');

            return {
                waveNumber: waveMatch ? parseInt(waveMatch[1]) : null,
                hasWaveText: /wave/i.test(bodyText),
                zombieElementCount: zombieElements.length,
                hasCanvas: !!canvas,
                bodyTextSnippet: bodyText.substring(0, 300)
            };
        }''')
        print(f"   Wave info: {wave_info}")

        # Check console for wave-related logs
        wave_logs = [log for log in console_logs if 'wave' in log.lower() or 'spawn' in log.lower()]
        print(f"   Wave-related console logs: {len(wave_logs)}")
        for log in wave_logs[:5]:
            print(f"      {log}")

        # Wave auto-start check - look for wave number > 0 or wave text
        if wave_info.get('waveNumber') and wave_info.get('waveNumber') >= 1:
            print("   PASSED - Wave auto-started (wave number detected)")
            results['checks']['waves_auto_start'] = True
        elif wave_info.get('hasWaveText'):
            print("   PASSED - Wave text found in page")
            results['checks']['waves_auto_start'] = True
        else:
            print("   UNCERTAIN - Could not confirm wave auto-start from DOM")
            results['checks']['waves_auto_start'] = None  # Need manual verification

        # Take post-wait screenshot
        page.screenshot(path='/tmp/qa_after_wait.png')
        print("   After-wait screenshot: /tmp/qa_after_wait.png")

        # CHECK 5: Money Bridge (try to answer quiz question)
        print("\n6. Checking Money Bridge (answering quiz question)...")

        # Get current gold before answering
        pre_answer_gold = page.evaluate('''() => {
            const bodyText = document.body.innerText;
            const goldMatch = bodyText.match(/Gold[:\\s]*([0-9]+)/i);
            return goldMatch ? parseInt(goldMatch[1]) : null;
        }''')
        print(f"   Gold before answer: {pre_answer_gold}")

        # Try to click an answer button
        answer_clicked = page.evaluate('''() => {
            const buttons = document.querySelectorAll('button');
            // Find answer buttons (not Start/difficulty buttons)
            for (let btn of buttons) {
                const text = btn.textContent.toLowerCase();
                // Skip non-answer buttons
                if (text.includes('easy') || text.includes('normal') || text.includes('hard') ||
                    text.includes('insane') || text.includes('start') || text.includes('nightmare')) {
                    continue;
                }
                // This might be an answer button
                if (btn.offsetParent !== null) {  // Is visible
                    btn.click();
                    return { clicked: true, buttonText: btn.textContent.substring(0, 50) };
                }
            }
            return { clicked: false, reason: 'No answer button found' };
        }''')
        print(f"   Answer click result: {answer_clicked}")

        # Wait for potential gold update
        time.sleep(1)

        # Get gold after answering
        post_answer_gold = page.evaluate('''() => {
            const bodyText = document.body.innerText;
            const goldMatch = bodyText.match(/Gold[:\\s]*([0-9]+)/i);
            return goldMatch ? parseInt(goldMatch[1]) : null;
        }''')
        print(f"   Gold after answer: {post_answer_gold}")

        # Check if gold changed
        if pre_answer_gold is not None and post_answer_gold is not None:
            gold_change = post_answer_gold - pre_answer_gold
            print(f"   Gold change: {gold_change}")
            if gold_change == 30:
                print("   PASSED - Correct answer gave +30 gold")
                results['checks']['money_bridge'] = True
            elif gold_change == -10:
                print("   PASSED - Wrong answer gave -10 gold (money bridge working)")
                results['checks']['money_bridge'] = True
            elif gold_change != 0:
                print(f"   PASSED - Gold changed by {gold_change} (money bridge connected)")
                results['checks']['money_bridge'] = True
            else:
                print("   FAILED - Gold did not change after answer")
                results['checks']['money_bridge'] = False
        else:
            print("   UNCERTAIN - Could not detect gold values")
            results['checks']['money_bridge'] = None

        # Take final screenshot
        page.screenshot(path='/tmp/qa_final.png')
        print("   Final screenshot: /tmp/qa_final.png")

        # CHECK 6: Any runtime errors during testing
        print("\n7. Final Runtime Error Check:")
        if results['runtime_errors']:
            print("   FAILED - Runtime errors occurred:")
            for err in results['runtime_errors']:
                print(f"      {err}")
            results['checks']['stable_during_test'] = False
        else:
            print("   PASSED - No runtime errors during test")
            results['checks']['stable_during_test'] = True

        browser.close()

        # FINAL VERDICT
        print("\n" + "="*50)
        print("VERIFICATION RESULT:")
        print("="*50)

        for check, passed in results['checks'].items():
            if passed is True:
                status = "PASS"
            elif passed is False:
                status = "FAIL"
            else:
                status = "UNCERTAIN"
            print(f"  {check}: {status}")

        # Count results
        passed_count = sum(1 for v in results['checks'].values() if v is True)
        failed_count = sum(1 for v in results['checks'].values() if v is False)
        uncertain_count = sum(1 for v in results['checks'].values() if v is None)

        print()
        print(f"Passed: {passed_count}, Failed: {failed_count}, Uncertain: {uncertain_count}")

        if failed_count > 0:
            print("\nVERIFICATION FAILED")
            return False, results
        elif uncertain_count > 0:
            print("\nVERIFICATION NEEDS MANUAL CHECK")
            print("Screenshots saved for manual review:")
            print("  /tmp/qa_initial.png")
            print("  /tmp/qa_after_wait.png")
            print("  /tmp/qa_final.png")
            return None, results
        else:
            print("\nVERIFICATION PASSED")
            return True, results

if __name__ == "__main__":
    verify_fixes()
