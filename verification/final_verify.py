
from playwright.sync_api import sync_playwright

def verify_home_page():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            page.goto('http://localhost:3000')
            page.wait_for_selector('h1')
            page.screenshot(path='verification/final_home_check.png', full_page=True)
            print('Screenshot saved to verification/final_home_check.png')
        except Exception as e:
            print(f'Error: {e}')
        finally:
            browser.close()

if __name__ == '__main__':
    verify_home_page()
