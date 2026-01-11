# Deployment notes

This project is deployed using **GitHub Pages** via the `gh-pages` branch.

Updating the repository does NOT automatically update the live site.

## How to update the website

After making changes:

1. Commit and push your code as usual:
   git add .
   git commit -m "your message"
   git push
   
2. Deploy the current version to GitHub Pages:
   npm run deploy
   
Only after running npm run deploy will the live site be updated.
Think of it as:
git push — save the code
npm run deploy — publish it to the world