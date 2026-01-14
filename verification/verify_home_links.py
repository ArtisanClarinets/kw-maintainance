
from playwright.sync_api import sync_playwright
import time
import sys

def verify_home_links():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()

        print("Navigating to Home...")
        try:
            page.goto("http://localhost:3000")
        except Exception as e:
            print(f"Failed to load home page: {e}")
            sys.exit(1)

        # Define the services we expect based on services.ts
        services = [
            "handyman-services",
            "installations",
            "painting",
            "tv-mounting",
            "moving-services",
            "trash-disposal"
        ]

        for service_id in services:
            url = f"http://localhost:3000/services/{service_id}"
            print(f"Checking {url}...")
            response = page.request.get(url)
            if response.status == 200:
                print(f"  OK: {url}")
            else:
                print(f"  FAIL: {url} returned {response.status}")
                sys.exit(1)

        print("All Residential Service links are valid.")
        browser.close()

if __name__ == "__main__":
    verify_home_links()
