import test from "node:test";
import assert from "node:assert/strict";
import {
  getImageLoadingProps,
  getResponsiveSizes,
  getAuthorInitials,
} from "./imageUtils";

test("getImageLoadingProps correctly flags above-the-fold images for LCP", () => {
  const props = getImageLoadingProps(true);
  assert.equal(props.loading, "eager");
  assert.equal(props.decoding, "sync");
  assert.equal(props.fetchPriority, "high");
});

test("getImageLoadingProps correctly flags below-the-fold images for lazy loading", () => {
  const props = getImageLoadingProps(false);
  assert.equal(props.loading, "lazy");
  assert.equal(props.decoding, "async");
  assert.equal(props.fetchPriority, "low");
});

test("getResponsiveSizes provides correct srcset media queries for gallery layouts", () => {
  assert.match(getResponsiveSizes("gallery-main"), /100vw/);
  assert.match(getResponsiveSizes("gallery-grid"), /50vw/);
  assert.equal(getResponsiveSizes("avatar"), "48px");
  assert.equal(getResponsiveSizes("thumbnail"), "64px");
});

test("getAuthorInitials handles various author name formats gracefully", () => {
  assert.equal(getAuthorInitials("Kawa Fonseca"), "KF");
  assert.equal(getAuthorInitials("Michel Bezerra dos Santos"), "MB");
  assert.equal(getAuthorInitials("Ivanusa"), "IV");
  assert.equal(getAuthorInitials(""), "CL");
  assert.equal(getAuthorInitials("   "), "CL");
});
