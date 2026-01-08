from playwright.sync_api import sync_playwright

def verify_home_page():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            page.goto("http://localhost:3000")

            # Wait for content to load
            page.wait_for_selector("text=Professional Maintenance & Repairs")

            # Take screenshot of the Hero section
            page.screenshot(path="verification/home_hero.png")
            print("Screenshot saved to verification/home_hero.png")

            # Scroll down to see updated sections
            page.evaluate("window.scrollBy(0, 800)")
            page.wait_for_timeout(1000)
            page.screenshot(path="verification/home_services.png")
            print("Screenshot saved to verification/home_services.png")

        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_home_page()
