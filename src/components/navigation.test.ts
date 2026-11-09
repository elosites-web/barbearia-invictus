import { test, describe, before, after } from "node:test";
import assert from "node:assert/strict";
import { GlobalWindow } from "happy-dom";
import React from "react";
import { createRoot } from "react-dom/client";
import { act } from "react";

describe("Navigation synchronization suite", () => {
  let windowInstance: GlobalWindow;
  let container: HTMLDivElement;
  let root: any;

  before(() => {
    (globalThis as any).IS_REACT_ACT_ENVIRONMENT = true;
    windowInstance = new GlobalWindow({ url: "http://localhost:3000/" });
    (globalThis as any).window = windowInstance;
    (globalThis as any).document = windowInstance.document;
    try {
      Object.defineProperty(globalThis, "navigator", {
        value: windowInstance.navigator,
        configurable: true,
        writable: true,
      });
    } catch {
      // Ignore if read-only
    }
    (globalThis as any).history = windowInstance.history;
    (globalThis as any).requestAnimationFrame = (cb: FrameRequestCallback) => setTimeout(cb, 16);

    let currentScrollY = 0;
    Object.defineProperty(windowInstance, "scrollY", {
      get: () => currentScrollY,
      set: (val: number) => {
        currentScrollY = val;
      },
      configurable: true,
    });

    // Mock scrollTo
    (windowInstance as any).scrollTo = ({ top }: { top: number }) => {
      (windowInstance as any).scrollY = top;
    };

    // Mock IntersectionObserver
    (globalThis as any).IntersectionObserver = class {
      callback: any;
      constructor(callback: any) {
        this.callback = callback;
      }
      observe() {}
      unobserve() {}
      disconnect() {}
    };

    // Create target section DOM elements
    const sectionIds = ["inicio", "servicos", "trabalho", "experiencia", "avaliacoes", "localizacao", "faq"];
    sectionIds.forEach((id, index) => {
      const section = windowInstance.document.createElement("section") as any;
      section.id = id;
      // Mock getBoundingClientRect
      section.getBoundingClientRect = () => {
        const currentScrollY = (windowInstance as any).scrollY || 0;
        const sectionTop = index * 800;
        const relativeTop = sectionTop - currentScrollY;
        return {
          top: relativeTop,
          bottom: relativeTop + 800,
          left: 0,
          right: 1000,
          width: 1000,
          height: 800,
          x: 0,
          y: relativeTop,
          toJSON: () => {},
        };
      };
      windowInstance.document.body.appendChild(section);
    });
  });

  after(() => {
    if (root) {
      act(() => {
        root.unmount();
      });
    }
  });

  test("Execution of mandatory user test sequence: Início -> abrir menu -> Serviços -> fechar menu -> abrir menu -> confirmar Serviços selecionado -> Localização -> fechar menu -> abrir menu -> confirmar Localização selecionada", async () => {
    const { Header } = await import("./Header");

    container = windowInstance.document.createElement("div") as any;
    windowInstance.document.body.appendChild(container as any);
    root = createRoot(container as any);

    await act(async () => {
      root.render(React.createElement(Header, { onOpenCommercialModal: () => {} }));
    });

    // 1. Initial State: activeSection must be 'inicio'
    const desktopInicioLink = container.querySelector('nav a[href="#inicio"]') as any;
    assert.ok(desktopInicioLink, "Desktop 'Início' link should exist");
    assert.ok(
      desktopInicioLink.className.includes("text-[#f3e5ab]"),
      "'Início' must be visually selected by default"
    );

    // 2. Open Mobile Menu
    const toggleBtn = container.querySelector('button[aria-controls="mobile-navigation-drawer"]') as any;
    assert.ok(toggleBtn, "Mobile menu toggle button must exist");

    await act(async () => {
      toggleBtn.click();
    });

    let mobileDrawer = windowInstance.document.getElementById("mobile-navigation-drawer") as any;
    assert.ok(mobileDrawer, "Mobile drawer should be open in portal");

    // Check Início is selected in mobile drawer
    let mobileInicio = mobileDrawer.querySelector('a[href="#inicio"]') as any;
    assert.ok(mobileInicio?.className.includes("text-[#f3e5ab]"), "Início should be selected in mobile drawer");

    // 3. Click 'Serviços' in mobile menu
    const mobileServicosLink = mobileDrawer.querySelector('a[href="#servicos"]') as any;
    assert.ok(mobileServicosLink, "Serviços link should exist in mobile drawer");

    await act(async () => {
      mobileServicosLink.click();
    });

    // 4. Drawer closes automatically upon clicking a section
    mobileDrawer = windowInstance.document.getElementById("mobile-navigation-drawer") as any;
    assert.equal(mobileDrawer, null, "Mobile drawer should be closed after clicking Serviços");

    // Desktop nav must now show Serviços selected
    const desktopServicosLink = container.querySelector('nav a[href="#servicos"]') as any;
    assert.ok(
      desktopServicosLink?.className.includes("text-[#f3e5ab]"),
      "Serviços must be selected in desktop menu immediately"
    );

    // 5. Reopen menu: Confirm 'Serviços' is still selected
    await act(async () => {
      toggleBtn.click();
    });

    mobileDrawer = windowInstance.document.getElementById("mobile-navigation-drawer") as any;
    assert.ok(mobileDrawer, "Mobile drawer should be open again");

    const reopenedServicos = mobileDrawer.querySelector('a[href="#servicos"]') as any;
    assert.ok(
      reopenedServicos?.className.includes("text-[#f3e5ab]"),
      "Serviços MUST remain selected when reopening the mobile menu"
    );

    // 6. Click 'Localização' in mobile menu
    const mobileLocalizacaoLink = mobileDrawer.querySelector('a[href="#localizacao"]') as any;
    assert.ok(mobileLocalizacaoLink, "Localização link should exist in mobile drawer");

    await act(async () => {
      mobileLocalizacaoLink.click();
    });

    // 7. Drawer closes automatically
    mobileDrawer = windowInstance.document.getElementById("mobile-navigation-drawer");
    assert.equal(mobileDrawer, null, "Mobile drawer should close after clicking Localização");

    // Desktop nav must show Localização selected
    const desktopLocalizacaoLink = container.querySelector('nav a[href="#localizacao"]');
    assert.ok(
      desktopLocalizacaoLink?.className.includes("text-[#f3e5ab]"),
      "Localização must be selected in desktop menu"
    );

    // 8. Reopen menu: Confirm 'Localização' is still selected
    await act(async () => {
      toggleBtn.click();
    });

    mobileDrawer = windowInstance.document.getElementById("mobile-navigation-drawer");
    assert.ok(mobileDrawer, "Mobile drawer should be open again");

    const reopenedLocalizacao = mobileDrawer.querySelector('a[href="#localizacao"]');
    assert.ok(
      reopenedLocalizacao?.className.includes("text-[#f3e5ab]"),
      "Localização MUST remain selected when reopening the mobile menu"
    );

    // Close menu for subsequent tests
    await act(async () => {
      toggleBtn.click();
    });
  });

  test("Manual scroll synchronization: returns to 'inicio' at top of page (scrollY < 80)", async () => {
    // Wait for click navigation lock to expire
    await new Promise((r) => setTimeout(r, 1000));

    // Simulate scroll to top
    (windowInstance as any).scrollY = 10;
    await act(async () => {
      windowInstance.dispatchEvent(new (windowInstance as any).Event("scroll"));
      await new Promise((r) => setTimeout(r, 80));
    });

    const desktopInicioLink = container.querySelector('nav a[href="#inicio"]');
    assert.ok(
      desktopInicioLink?.className.includes("text-[#f3e5ab]"),
      "'Início' must be highlighted when scrolled to the top of the page"
    );
  });

  test("Manual scroll synchronization: scrolling to 'servicos' updates desktop highlight and mobile drawer highlight", async () => {
    // Scroll so that 'servicos' (index 1 at top: 800) is in active focus zone (scrollY = 780, rect.top = 20)
    (windowInstance as any).scrollY = 780;
    await act(async () => {
      windowInstance.dispatchEvent(new (windowInstance as any).Event("scroll"));
      await new Promise((r) => setTimeout(r, 80));
    });

    // Check desktop link
    const desktopServicosLink = container.querySelector('nav a[href="#servicos"]');
    assert.ok(
      desktopServicosLink?.className.includes("text-[#f3e5ab]"),
      "'Serviços' must be highlighted on desktop after manual scrolling to it"
    );

    // Open mobile menu and verify 'Serviços' is highlighted in the drawer
    const toggleBtn = container.querySelector('button[aria-controls="mobile-navigation-drawer"]') as any;
    await act(async () => {
      toggleBtn.click();
    });

    const mobileDrawer = windowInstance.document.getElementById("mobile-navigation-drawer");
    assert.ok(mobileDrawer, "Mobile drawer should be open");

    const drawerServicos = mobileDrawer.querySelector('a[href="#servicos"]');
    assert.ok(
      drawerServicos?.className.includes("text-[#f3e5ab]"),
      "'Serviços' must be highlighted in mobile drawer after manual scrolling"
    );

    // Close drawer
    await act(async () => {
      toggleBtn.click();
    });
  });

  test("Clicking Hero scroll indicator to 'servicos' triggers identical anchoring and highlights 'servicos' in menu", async () => {
    const { Hero } = await import("./Hero");

    const heroContainer = windowInstance.document.createElement("div") as any;
    windowInstance.document.body.appendChild(heroContainer);
    const heroRoot = createRoot(heroContainer);

    await act(async () => {
      heroRoot.render(React.createElement(Hero));
    });

    const scrollIndicator = heroContainer.querySelector('a[href="#servicos"]') as any;
    assert.ok(scrollIndicator, "Hero scroll indicator anchor to #servicos must exist");

    await act(async () => {
      scrollIndicator.click();
      await new Promise((r) => setTimeout(r, 50));
    });

    // The desktop menu link for Serviços must now be highlighted identically
    const desktopServicosLink = container.querySelector('nav a[href="#servicos"]') as any;
    assert.ok(
      desktopServicosLink?.className.includes("text-[#f3e5ab]"),
      "'Serviços' must be highlighted in the menu when Hero scroll indicator is clicked"
    );

    act(() => {
      heroRoot.unmount();
    });
  });
});
