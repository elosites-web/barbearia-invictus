import { chromium } from "playwright";

async function run() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await context.newPage();

  console.log("Navigating to http://localhost:3000...");
  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });

  // 1. Check title & SEO
  const title = await page.title();
  console.log("Page title:", title);

  // 2. Check 3D buttons click behavior
  const ctaButton = page.locator('a:has-text("CONHECER NOSSOS SERVIÇOS")').first();
  await ctaButton.click();
  const isCtaPressed = await ctaButton.getAttribute("data-pressed");
  console.log("CTA button pressed after click:", isCtaPressed);

  // Click another button to verify previous unpresses and new one presses
  const filterBtn = page.locator('button:has-text("Degradê & Fade")').first();
  await filterBtn.click();
  const isFilterPressed = await filterBtn.getAttribute("data-pressed");
  const isCtaStillPressed = await ctaButton.getAttribute("data-pressed");
  console.log("Filter button pressed:", isFilterPressed, "CTA button pressed now:", isCtaStillPressed);

  // 3. Test Scroll Progress Bar: scroll down (forward = razor)
  await page.evaluate(() => window.scrollTo(0, 1500));
  await page.waitForTimeout(400);
  const forwardToolTitle = await page.locator('[role="progressbar"] [title]').first().getAttribute("title");
  console.log("Progress tool when scrolling down:", forwardToolTitle);

  // Scroll up (backward = scissors)
  await page.evaluate(() => window.scrollTo(0, 800));
  await page.waitForTimeout(400);
  const backwardToolTitle = await page.locator('[role="progressbar"] [title]').first().getAttribute("title");
  console.log("Progress tool when scrolling up:", backwardToolTitle);

  // 4. Test Reviews Section 3D Carousel
  const reviewsSection = page.locator("#avaliacoes");
  await reviewsSection.scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);
  console.log("Reviews section reached");

  // Take screenshot of reviews carousel
  await page.screenshot({ path: "/tmp/reviews-carousel.png" });

  // 5. Test Footer
  const footer = page.locator("footer");
  await footer.scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  await page.screenshot({ path: "/tmp/footer.png" });
  console.log("Footer screenshot taken");

  // 6. Test Mobile Horizontal / Landscape mode
  console.log("Testing mobile landscape mode (844x390)...");
  const mobileContext = await browser.newContext({ viewport: { width: 844, height: 390 } });
  const mobilePage = await mobileContext.newPage();
  await mobilePage.goto("http://localhost:3000", { waitUntil: "networkidle" });

  // Open mobile menu
  const menuToggle = mobilePage.locator('button[aria-label="Abrir menu de navegação"]');
  await menuToggle.click();
  await mobilePage.waitForTimeout(300);

  // Check body overflow is locked
  const bodyOverflow = await mobilePage.evaluate(() => document.body.style.overflow);
  console.log("Body overflow when mobile menu is open:", bodyOverflow);

  // Check mobile drawer scrollability
  const drawer = mobilePage.locator("#mobile-navigation-drawer");
  const drawerExists = await drawer.count();
  const drawerClasses = await drawer.getAttribute("class");
  console.log("Mobile drawer exists:", drawerExists, "contains overflow-y-auto:", drawerClasses?.includes("overflow-y-auto"));

  await mobilePage.screenshot({ path: "/tmp/mobile-landscape-menu.png" });

  await browser.close();
  console.log("All verifications completed successfully!");
}

run().catch((err) => {
  console.error("Test error:", err);
  process.exit(1);
});
