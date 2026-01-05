import asyncio
from playwright.async_api import async_playwright

async def verify_mobile_menu():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        # iPhone 13 viewport
        iphone_13 = p.devices['iPhone 13']
        context = await browser.new_context(**iphone_13)
        page = await context.new_page()

        print("Navigating to homepage...")
        # Use port 3001 as detected in the logs
        try:
            await page.goto("http://localhost:3001", timeout=60000)
        except Exception as e:
            print(f"Navigation failed: {e}")
            await browser.close()
            return

        print("Checking for mobile menu button...")
        # Wait for hydration
        await page.wait_for_timeout(2000)

        # Look for the button inside the header.
        # Based on the code, it's a button with a Menu icon.
        # We can look for a button that is visible.
        menu_button = page.locator("header button").first

        if await menu_button.is_visible():
            print("Menu button found. Clicking...")
            await menu_button.click()

            # Wait for animation
            await page.wait_for_timeout(1000)

            print("Checking for menu links...")
            # We expect the overlay to be visible now, containing nav links.
            # The overlay is likely a fixed div with a nav inside.

            # Look for links that are visible
            nav_links = page.locator("a[href='/services'], a[href='/contact']")

            # Since it's an overlay, we might need to be specific, but let's see if any links are visible.
            # In the desktop view they are hidden, in mobile overlay they should be visible.

            # Let's take a screenshot first to be safe
            await page.screenshot(path="mobile_menu_open.png")
            print("Screenshot saved to mobile_menu_open.png")

            # Check for specific link visibility
            services_link = page.locator("a:has-text('Services')").first
            if await services_link.is_visible():
                 print("Success: 'Services' link is visible in the mobile menu.")
            else:
                 print("Warning: 'Services' link not found or not visible.")

        else:
            print("Error: Menu button not found in header.")
            # Take screenshot for debugging
            await page.screenshot(path="mobile_menu_error.png")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(verify_mobile_menu())
