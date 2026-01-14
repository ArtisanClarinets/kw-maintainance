from playwright.sync_api import Page, expect, sync_playwright

def verify_commercial_flow(page: Page):
    # 1. Go to Home
    page.goto("http://localhost:3000")

    # 2. Check for Commercial Link in Nav (Header)
    expect(page.locator("header nav").get_by_role("link", name="Commercial")).to_be_visible()

    # 3. Navigate to Commercial Page via Header
    page.locator("header nav").get_by_role("link", name="Commercial").click()

    # 4. Assert Title on Commercial Page
    expect(page.get_by_role("heading", name="Reliable Maintenance for")).to_be_visible()

    # 5. Check for Services (in Main)
    expect(page.locator("main").get_by_text("Preventative Maintenance")).to_be_visible()
    expect(page.locator("main").get_by_text("Hospitality Turnover")).to_be_visible()

    # 6. Screenshot Commercial Page
    page.screenshot(path="verification/commercial_page.png", full_page=True)

    # 7. Navigate to Detail
    page.get_by_role("link", name="Preventative Maintenance").first.click()

    # 8. Assert Detail Page
    expect(page.get_by_role("heading", name="PREVENTATIVE MAINTENANCE")).to_be_visible()

    # 9. Screenshot Detail Page
    page.screenshot(path="verification/commercial_detail.png", full_page=True)

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            verify_commercial_flow(page)
            print("Verification successful!")
        except Exception as e:
            print(f"Verification failed: {e}")
            page.screenshot(path="verification/error.png")
            raise
        finally:
            browser.close()
