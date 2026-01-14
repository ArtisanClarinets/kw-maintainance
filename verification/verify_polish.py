
from playwright.sync_api import sync_playwright
import time

def verify_polish(page):
    # Verify Contact Page
    page.goto("http://localhost:3000/contact")
    time.sleep(2) # Wait for SplitText
    page.screenshot(path="verification/contact_polished.png")

    # Verify Service Area Page
    page.goto("http://localhost:3000/service-area")
    time.sleep(2)
    page.screenshot(path="verification/service_area_polished.png")

    # Verify Request Demo Page
    page.goto("http://localhost:3000/request-demo")
    time.sleep(2)
    page.screenshot(path="verification/request_demo_polished.png")

    # Verify Footer
    page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
    time.sleep(1)
    page.screenshot(path="verification/footer_polished.png")

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    try:
        verify_polish(page)
    except Exception as e:
        print(e)
    finally:
        browser.close()
