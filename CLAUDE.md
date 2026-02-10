# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Woodpecker House is a single-page static website for a lodging/hospedaje business located in Rancho Quemado, Osa, Costa Rica. The site is hosted via GitHub Pages (CarlosGuevara89.github.io) and developed locally using XAMPP.

## Development Environment

- **Local server**: XAMPP (Apache + PHP) — the site lives at `C:\xampp\htdocs\WoodpeckerHouse`
- **PHP is required** for the contact form backend (`php/sendmail.php`)
- No build tools, package managers, or bundlers — all assets are served directly

## Architecture

This is a vanilla HTML/CSS/JS site with a PHP backend for email:

- **`index.html`** — Single-page layout with sections: banner carousel, about, contact info, image gallery, contact form with map, and footer
- **`css/styles.css`** — All custom styles; uses CSS Grid for the gallery layout with multiple responsive breakpoints
- **`js/scripts.js`** — Navbar scroll behavior (vanilla JS), contact form AJAX submission (jQuery), and banner display logic
- **`php/sendmail.php`** — Contact form handler using PHPMailer over Gmail SMTP with Google reCAPTCHA v2 validation
- **`php/PHPMailer/`** — Vendored PHPMailer library (not installed via Composer)

## Key Dependencies (CDN)

- Bootstrap 5.3.0-alpha1 (CSS + JS + Popper.js)
- jQuery 3.5.1
- Font Awesome 5.15.4
- Animate.css 4.1.1
- SweetAlert2 v11
- Google Fonts (Cinzel)
- Google reCAPTCHA v2

## Contact Form Flow

1. User submits form → jQuery AJAX POST to `php/sendmail.php`
2. Server validates reCAPTCHA, returns `1` (failed) or `2` (success)
3. Client shows SweetAlert2 notification based on response code
4. A loading spinner overlay (`#loader`) displays during the request

## Content Language

- HTML content is in **English**, but JS alert messages and PHP comments are in **Spanish**
- The site uses `lang="es"` on the HTML element

## Gallery

The image gallery uses CSS Grid with a complex responsive layout defined via `nth-child` selectors across three breakpoints (>800px, 500-800px, <500px).
