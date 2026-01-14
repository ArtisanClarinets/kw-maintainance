import os

replacements = [
    ('@/lib/', '@/shared/lib/'),
    ('@/hooks/', '@/shared/hooks/'),
    ('@/components/ui/', '@/shared/ui/'),
    ('@/components/react-bits/', '@/shared/ui/react-bits/'),
    ('@/components/providers/', '@/shared/providers/'),
    ('@/components/Header', '@/widgets/Header'),
    ('@/components/Footer', '@/widgets/Footer'),
    ('@/components/Hero', '@/widgets/Hero'),
    ('@/components/ServiceCard', '@/entities/service/ui/ServiceCard'),
    ('@/components/Marquee', '@/shared/ui/Marquee'),
    ('@/components/GulfGrid', '@/widgets/GulfGrid'),
    ('@/components/ServiceCorridorMap', '@/widgets/ServiceCorridorMap'),
    ('@/components/ServiceDetailTemplate', '@/widgets/ServiceDetailTemplate'),
    ('@/components/HeroVisual', '@/widgets/HeroVisual'),
    ('@/components/Breadcrumbs', '@/shared/ui/Breadcrumbs'),
    ('@/components/Button', '@/shared/ui/CustomButton'),
    ('@/components/SmoothScrolling', '@/shared/providers/SmoothScrolling'),
    # Fix relative imports that might be broken if I didn't update them (but I'm using absolute paths mostly in app).
    # If files inside components used relative imports to each other, they are now in different places?
    # Widgets were all in components/, so they might import each other via `./`.
    # But they are mostly moving to `src/widgets`, so `./` still works for widget-to-widget?
    # `ServiceCard` moved to entities, so imports to it from widgets will need update.
]

def refactor_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    original_content = content
    for old, new in replacements:
        content = content.replace(old, new)

    if content != original_content:
        with open(filepath, 'w') as f:
            f.write(content)
        print(f"Updated {filepath}")

def walk_and_refactor(directory):
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith('.tsx') or file.endswith('.ts'):
                refactor_file(os.path.join(root, file))

if __name__ == "__main__":
    walk_and_refactor('src')
