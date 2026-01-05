
import asyncio
from playwright.async_api import async_playwright

async def verify_site():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        # 1. Homepage Hero (Light Mode)
        print("Navigating to Home (Light)...")
        try:
            await page.goto("http://localhost:3001", timeout=30000)
        except Exception as e:
            print(f"Failed to load home: {e}")
            await browser.close()
            return

        await page.wait_for_timeout(3000) # Allow animations to settle
        await page.screenshot(path="/home/jules/verification/home_light.png")
        print("Captured home_light.png")

        # 2. Homepage Hero (Dark Mode)
        print("Navigating to Home (Dark)...")
        await page.emulate_media(color_scheme="dark")
        await page.reload()
        await page.wait_for_timeout(3000)
        await page.screenshot(path="/home/jules/verification/home_dark.png")
        print("Captured home_dark.png")

        # Reset to light
        await page.emulate_media(color_scheme="light")

        # 3. Service Area Page
        print("Navigating to Service Area...")
        await page.goto("http://localhost:3001/service-area")
        await page.wait_for_timeout(2000)
        await page.screenshot(path="/home/jules/verification/service_area.png")
        print("Captured service_area.png")

        # 4. Gallery Page
        print("Navigating to Gallery...")
        await page.goto("http://localhost:3001/gallery")
        await page.wait_for_timeout(2000)
        await page.screenshot(path="/home/jules/verification/gallery.png")
        print("Captured gallery.png")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(verify_site())
