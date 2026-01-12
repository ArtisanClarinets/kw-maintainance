
from playwright.sync_api import sync_playwright
import time

def verify_kinetic(page):
    page.goto("http://localhost:3000")

    # Wait for split text animation
    time.sleep(2)

    # Screenshot Hero
    page.screenshot(path="verification/hero.png")

    # Scroll to Services
    page.evaluate("window.scrollTo(0, 800)")
    time.sleep(1)
    page.screenshot(path="verification/services.png")

    # Scroll to About
    page.goto("http://localhost:3000/about")
    time.sleep(2)
    page.screenshot(path="verification/about.png")

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    try:
        verify_kinetic(page)
    except Exception as e:
        print(e)
    finally:
        browser.close()
