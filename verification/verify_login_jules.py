from playwright.sync_api import sync_playwright

def verify_login():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            print("Navigating to login page...")
            page.goto("http://localhost:3000/login")

            # Wait for content
            page.wait_for_selector("text=KW Enterprise Login")

            print("Taking screenshot of login page...")
            page.screenshot(path="verification/login_page_v2.png")

            # Try to login with demo account
            page.fill("input[name='email']", "admin@example.com")
            page.fill("input[name='password']", "password")
            page.click("button[type='submit']")

            # Should redirect to admin
            print("Waiting for redirection to admin...")
            page.wait_for_url("**/admin")

            print("Taking screenshot of admin page...")
            page.screenshot(path="verification/admin_dashboard_v2.png")

        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_login()
