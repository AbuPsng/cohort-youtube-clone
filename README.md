# 🎬 Video Search App

This project is a dynamic video search app that fetches videos from a public API and displays them beautifully with thumbnails, titles, view counts, and published dates. It also includes features like debounce search and input clearing.

## 🚀 Features

- **Fetch All Videos:** Fetches videos from a public API and renders them in a grid layout.
- **Search Videos with Debounce:** Improves performance by reducing API calls while typing. The search is triggered after a short delay, ensuring smoother user experience.
- **Dynamic Video Cards:** Each video card includes:
  - Thumbnail
  - Title
  - Channel Name
  - View Count (formatted in K/M)
  - Published Time (converted into days, weeks, months, or years)
- **Clear Search Input:** One-click input clearing, which resets the video list.

## ⚡ Learn About Debouncing

Debouncing is a technique used to limit the rate at which a function is executed. In this project, the video search input is debounced to prevent multiple API calls while typing quickly. It ensures that the search function only fires after the user stops typing for a specified delay. This reduces unnecessary load and improves performance.
