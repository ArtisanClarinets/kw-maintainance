import sys
from playwright.sync_api import sync_playwright

def verify_kinetic():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        print("Navigating to Home Page...")
        page.goto("http://localhost:3000")
        page.wait_for_load_state("networkidle")

        # 1. Verify Particles Canvas (Hero)
        # Note: canvas inside ParticlesBackgroundLazy -> Suspense -> ParticlesBackground -> Canvas
        # It might take a moment to load if lazy.
        page.wait_for_timeout(2000) # Wait for lazy load
        canvases = page.locator("canvas").count()
        print(f"Found {canvases} canvas elements.")
        if canvases >= 1:
            print("✅ WebGL Background/Cursor detected.")
        else:
            print("❌ No WebGL Canvas found.")

        # 2. Verify SplashCursor
        # Look for a fixed canvas
        splash_cursor = page.locator("canvas.fixed.inset-0")
        if splash_cursor.count() > 0:
             print("✅ SplashCursor detected.")
        else:
             print("❌ SplashCursor not found.")

        # 3. Verify SplitText
        h1 = page.locator("h1[aria-label]")
        if h1.count() > 0:
            label = h1.first.get_attribute("aria-label")
            print(f"✅ SplitText detected with label: {label}")
        else:
            print("❌ SplitText not detected.")

        # 4. Screenshot Hero
        page.screenshot(path="verification/hero_kinetic.png")
        print("📸 Screenshot saved: verification/hero_kinetic.png")

        # 5. Check Contact Page for Optimistic UI elements presence (static check)
        print("Navigating to Request Demo...")
        page.goto("http://localhost:3000/request-demo")
        page.wait_for_load_state("networkidle")

        # Check if form exists
        if page.locator("form").count() > 0:
            print("✅ Request Quote Form detected.")

        # Check button text
        btn_text = page.locator("button[type='submit']").text_content()
        print(f"✅ Submit button found with text: {btn_text}")

        browser.close()

if __name__ == "__main__":
    verify_kinetic()
