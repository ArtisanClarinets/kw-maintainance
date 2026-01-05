from playwright.sync_api import sync_playwright

def verify_colors():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Use a consistent viewport size for screenshots
        context = browser.new_context(viewport={"width": 1280, "height": 800})
        page = context.new_page()

        # Navigate to homepage
        print("Navigating to homepage...")
        page.goto("http://localhost:3000")
        page.wait_for_load_state("networkidle")

        # Take screenshot of homepage (Hero section with button)
        page.screenshot(path="verification/homepage_light.png")
        print("Homepage light screenshot taken.")

        # Navigate to Services page to see CheckCircle2 icons
        print("Navigating to Services page...")
        # Since I don't know the exact ID, I'll go to a service detail page if possible, or just /services
        # The CheckCircle2 was in ServiceDetailTemplate.tsx which is used in /services/[id]
        # I need to find a service ID. I'll guess 'handyman' or 'plumbing' based on typical content,
        # or I can list the files in content/services.ts to see ids.
        # But wait, I can just check the services page first.
        page.goto("http://localhost:3000/services")
        page.wait_for_load_state("networkidle")
        page.screenshot(path="verification/services_light.png")

        # Try to find a service link and click it
        # Assuming there are links on the services page
        try:
            # Click the first "View Details" or similar link, or just a service card
            # The ServiceCard component wraps the card in a Link.
            page.locator("a[href^='/services/']").first.click()
            page.wait_for_load_state("networkidle")
            page.screenshot(path="verification/service_detail_light.png")
            print("Service detail light screenshot taken.")
        except Exception as e:
            print(f"Could not navigate to service detail: {e}")

        # Test Dark Mode
        print("Testing Dark Mode...")
        # Emulate dark mode
        context_dark = browser.new_context(color_scheme="dark", viewport={"width": 1280, "height": 800})
        page_dark = context_dark.new_page()

        page_dark.goto("http://localhost:3000")
        page_dark.wait_for_load_state("networkidle")
        page_dark.screenshot(path="verification/homepage_dark.png")
        print("Homepage dark screenshot taken.")

        try:
             page_dark.goto("http://localhost:3000/services")
             page_dark.locator("a[href^='/services/']").first.click()
             page_dark.wait_for_load_state("networkidle")
             page_dark.screenshot(path="verification/service_detail_dark.png")
             print("Service detail dark screenshot taken.")
        except Exception as e:
             print(f"Could not navigate to service detail (dark): {e}")

        browser.close()

if __name__ == "__main__":
    verify_colors()
