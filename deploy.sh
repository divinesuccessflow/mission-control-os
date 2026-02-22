#!/bin/bash
# Deploy to GitHub Pages

echo "Building Mission Control OS for production..."
npm run build

echo ""
echo "✅ Build complete!"
echo ""
echo "To deploy to GitHub Pages:"
echo "1. Push this repository to GitHub"
echo "2. Go to Settings > Pages"
echo "3. Set source to 'Deploy from a branch'"
echo "4. Select the 'gh-pages' branch (or main/out folder)"
echo ""
echo "Or use GitHub Actions with the workflow in .github/workflows/deploy.yml"
