#!/bin/sh

if [[ $(git status -s) ]]
then
    echo "The working directory is dirty. Please commit any pending changes."
    exit 1;
fi

echo "Deleting old publication"
rm -rf build
mkdir build
git worktree prune
rm -rf .git/worktrees/build/

echo "Checking out gh-pages branch into public"
git worktree add -B gh-pages build origin/gh-pages

echo "Removing existing files"
rm -rf build/*

echo "Generating site"
hugo

echo "Updating gh-pages branch"
echo "foxriver.cz" >> build/CNAME
cd build && git add --all && git commit -m "Publishing to gh-pages (publish.sh)" && git push origin gh-pages && cd ..

