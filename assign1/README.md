# Assignment 1 - Hosting a website on Amazon CloudFront

* [Requirements](#requirements)
* [Description of Solution](#description-of-solution)
* [Built with Astro](#built-with-astro)
* [Installation](#installation)
* [Project Structure](#project-structure)
* [Commands](#commands)

## Requirements

My first assignment satisfies the following guidelines:

- Host a static website in a private Amazon S3 bucket and
- Serve the bucket within a CloudFront CDN distribution.

# Description of Solution

The static files (HTML/CSS/JS) were uploaded to an Amazon S3 bucket with initial permissions set to block all public access. A CloudFront distribution was then created with an IAM policy set up on the bucket so that only the CloudFront distrubution has private access to the bucket.

Cloudfront URL: [dzhuta41rrmvw.cloudfront.net](http://dzhuta41rrmvw.cloudfront.net/)

## Built with [Astro](https://astro.build)

The website is built on Astro using Tailwindcss for styling. Astro is a relatively new static site generator that lets you build websites similar to JS based frameworks, with the benefit of shipping websites with as little JavaScript as possible. Vue, React and Svelte components can also be imported and rendered for interactive elements.

## Installation

From the root of this project, use `npm install` from a terminal to import dependencies.

## Project Structure

```
assign1/
├── public/
├── src/
│   ├── components/
│   ├── layouts/
│   ├── pages/
│   └── styles/
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

`src/layouts` are where the general site structure of the site should be stored. Conversley, `src/components/` for any Astro/React/Vue/Svelte components.

Any global styles should be placed into `src/global.css`. Refer to the [Tailwindcss documenation](https://tailwindcss.com/docs/) for more details.

Any static assets, like images, can be placed in the `public/` directory, and will be copied into `./dist` as-is on build.

## Commands

All commands are run from the root of the project, from a terminal:

| Command           | Action                                       |
|:----------------  |:-------------------------------------------- |
| `npm install`     | Installs dependencies                        |
| `npm run dev`     | Starts local dev server at `localhost:3000`  |
| `npm run build`   | Build your production site to `./dist/`      |
| `npm run preview` | Preview your build locally, before deploying |
