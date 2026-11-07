/*
 * CGR — Product catalogue
 *
 * All prices, generated variants, specifications and rental
 * terms are DEMO DATA, not quotations or availability claims.
 *
 * Image paths are relative to the website root.
 * Edit product information in this file.
 */

(function () {
  "use strict";

  const SETTINGS = {
    currency: "INR",
    locale: "en-IN",

    demoMode: true,

    pricingNotice:
      "Demo prices and specifications only. Confirm final details before ordering.",

    taxNotice:
      "GST treatment has not been confirmed. Tax is not calculated in this preview.",

    checkoutEnabled: false,
    paymentsEnabled: false,

    basketStorageKey: "cgr-basket-v1",

    contact: {
      whatsappNumber: "+919790222381",
      phoneNumber: "+919790222381",
      email: "sn@cgrfc.com"
    }
  };

  function slugify(value) {
    return String(value)
      .toLowerCase()
      .trim()
      .replace(/&/g, " and ")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  function makeDemoRental(rate, period, minimumPeriods) {
    return {
      rate: rate,
      period: period,
      minimumPeriods: minimumPeriods,

      deposit: null,
      deliveryNote: "Delivery and collection charges to be confirmed.",
      installationNote:
        "Installation requirements and charges to be confirmed.",

      isDemo: true
    };
  }

  function makeMainVariant(options) {
    return {
      id: options.id,
      name: options.name,

      purchasePrice: options.purchasePrice,
      purchaseUnit: "set",

      rental: makeDemoRental(
        options.rentalRate,
        options.rentalPeriod || "day",
        options.minimumPeriods || 1
      ),

      specifications: [
        {
          label: "Configuration",
          value: options.configuration
        },
        {
          label: "Dimensions",
          value: "To be confirmed"
        },
        {
          label: "Included components",
          value: "Final component list to be confirmed"
        },
        {
          label: "Technical information",
          value:
            "Dimensions, load ratings, and suitability must be confirmed before use."
        }
      ],

      isDemo: true
    };
  }

  /*
   * MAIN PRODUCTS
   *
   * Main-product photo locations have not been confirmed.
   * Empty image arrays display a placeholder.
   *
   * When the actual files are uploaded, replace the empty
   * array with their real website-root-relative paths.
   *
   * Example only:
   * images: [
   *   "images/aluminium-scaffolding/1.jpg",
   *   "images/aluminium-scaffolding/2.jpg",
   *   "images/aluminium-scaffolding/3.jpg"
   * ]
   */

  const MAIN_PRODUCTS = [
    {
      id: "main-aluminium-scaffolding",
      name: "Aluminium Scaffolding",
      slug: "aluminium-scaffolding",

      category: "aluminium-scaffolding",
      categoryLabel: "Aluminium Scaffolding",
      type: "main",

      page: "pages/aluminium-scaffolding.html",

      description:
        "Explore aluminium scaffolding configurations for purchase or rental. " +
        "The options below are demonstration entries; final dimensions, " +
        "components, technical specifications, and prices will be added later.",

      images: [
        "images/aluminium-scaffolding/1.jpg",
        "images/aluminium-scaffolding/2.jpg",
        "images/aluminium-scaffolding/3.jpg",
        "images/aluminium-scaffolding/4.jpg",
        "images/aluminium-scaffolding/5.jpg"],

      purchaseEnabled: true,
      rentalEnabled: true,
      isDemo: true,

      specifications: [
        {
          label: "Product category",
          value: "Aluminium Scaffolding"
        },
        {
          label: "Material details",
          value: "Grade, finish, and component specifications to be confirmed"
        },
        {
          label: "Purchase pricing",
          value: "Demo amount per set"
        },
        {
          label: "Rental pricing",
          value: "Demo amount per set per day"
        },
        {
          label: "Availability",
          value: "To be confirmed"
        }
      ],

      variants: [
        makeMainVariant({
          id: "aluminium-scaffolding-demo-compact",
          name: "Compact Configuration — Demo",
          configuration: "Compact scaffolding configuration — placeholder",
          purchasePrice: 45000,
          rentalRate: 600
        }),

        makeMainVariant({
          id: "aluminium-scaffolding-demo-standard",
          name: "Standard Configuration — Demo",
          configuration: "Standard scaffolding configuration — placeholder",
          purchasePrice: 65000,
          rentalRate: 850
        }),

        makeMainVariant({
          id: "aluminium-scaffolding-demo-extended",
          name: "Extended Configuration — Demo",
          configuration: "Extended scaffolding configuration — placeholder",
          purchasePrice: 85000,
          rentalRate: 1100
        })
      ]
    },

    {
      id: "main-aluminium-stage",
      name: "Aluminium Stage",
      slug: "aluminium-stage",

      category: "aluminium-stage",
      categoryLabel: "Aluminium Stage",
      type: "main",

      page: "pages/aluminium-stage.html",

      description:
        "Explore aluminium stage configurations for purchase or rental. " +
        "Demonstration configurations are included for the preview. " +
        "Final deck dimensions, support arrangements, components, " +
        "technical specifications, and prices must be confirmed.",

      images: [
        "images/ringlock-scaffolding/1.jpg",
        "images/ringlock-scaffolding/2.jpg",
        "images/ringlock-scaffolding/3.jpg",
        "images/ringlock-scaffolding/4.jpg",
        "images/ringlock-scaffolding/5.jpg"],

      purchaseEnabled: true,
      rentalEnabled: true,
      isDemo: true,

      specifications: [
        {
          label: "Product category",
          value: "Aluminium Stage"
        },
        {
          label: "Frame and deck details",
          value: "Materials and construction details to be confirmed"
        },
        {
          label: "Purchase pricing",
          value: "Demo amount per set"
        },
        {
          label: "Rental pricing",
          value: "Demo amount per set per day"
        },
        {
          label: "Availability",
          value: "To be confirmed"
        }
      ],

      variants: [
        makeMainVariant({
          id: "aluminium-stage-demo-compact",
          name: "Compact Stage Set — Demo",
          configuration: "Compact stage arrangement — placeholder",
          purchasePrice: 30000,
          rentalRate: 750
        }),

        makeMainVariant({
          id: "aluminium-stage-demo-standard",
          name: "Standard Stage Set — Demo",
          configuration: "Standard stage arrangement — placeholder",
          purchasePrice: 60000,
          rentalRate: 1500
        }),

        makeMainVariant({
          id: "aluminium-stage-demo-expanded",
          name: "Expanded Stage Set — Demo",
          configuration: "Expanded stage arrangement — placeholder",
          purchasePrice: 120000,
          rentalRate: 3000
        })
      ]
    },

    {
      id: "main-ringlock-scaffolding",
      name: "Ringlock Scaffolding",
      slug: "ringlock-scaffolding",

      category: "ringlock-scaffolding",
      categoryLabel: "Ringlock Scaffolding",
      type: "main",

      page: "pages/ringlock-scaffolding.html",

      description:
        "Explore ringlock scaffolding configurations for purchase or rental. " +
        "These demonstration entries will be replaced with your final " +
        "system dimensions, component lists, specifications, and prices.",

      images: [
        "images/aluminium-stage/1.jpg",
        "images/aluminium-stage/2.jpg",
        "images/aluminium-stage/3.jpg",
        "images/aluminium-stage/4.jpg",
        "images/aluminium-stage/5.jpg"],

      purchaseEnabled: true,
      rentalEnabled: true,
      isDemo: true,

      specifications: [
        {
          label: "Product category",
          value: "Ringlock Scaffolding"
        },
        {
          label: "System specifications",
          value:
            "Material, finish, dimensions, and connections to be confirmed"
        },
        {
          label: "Purchase pricing",
          value: "Demo amount per set"
        },
        {
          label: "Rental pricing",
          value: "Demo amount per set per day"
        },
        {
          label: "Availability",
          value: "To be confirmed"
        }
      ],

      variants: [
        makeMainVariant({
          id: "ringlock-scaffolding-demo-compact",
          name: "Compact System — Demo",
          configuration: "Compact ringlock arrangement — placeholder",
          purchasePrice: 40000,
          rentalRate: 500
        }),

        makeMainVariant({
          id: "ringlock-scaffolding-demo-standard",
          name: "Standard System — Demo",
          configuration: "Standard ringlock arrangement — placeholder",
          purchasePrice: 70000,
          rentalRate: 900
        }),

        makeMainVariant({
          id: "ringlock-scaffolding-demo-extended",
          name: "Extended System — Demo",
          configuration: "Extended ringlock arrangement — placeholder",
          purchasePrice: 100000,
          rentalRate: 1300
        })
      ]
    }
  ];

  /*
   * CUSTOM PRODUCTS
   *
   * folder matches images/1/ through images/44/.
   * Product order and supplied names are preserved.
   *
   * demoPrice is a placeholder amount, not a final selling price.
   */

  const CUSTOM_PRODUCT_ROWS = [
    {
      folder: 1,
      name: "Aluminium Mobile Scaffolding Horizontal & Diagonal Brace Hook",
      group: "scaffolding-components",
      demoPrice: 180,
      unit: "piece"
    },
    {
      folder: 2,
      name: "Aluminium Mobile Scaffolding Bottom Cup",
      group: "scaffolding-components",
      demoPrice: 120,
      unit: "piece"
    },
    {
      folder: 3,
      name: "Aluminium Stage Horizontal (Bottom Clamp)",
      group: "stage-components",
      demoPrice: 250,
      unit: "piece"
    },
    {
      folder: 4,
      name: "Aluminium Stage Horizontal (Top Clamp)",
      group: "stage-components",
      demoPrice: 250,
      unit: "piece"
    },
    {
      folder: 5,
      name: "Aluminium Mobile Scaffolding Round Spigot Connector",
      group: "scaffolding-components",
      demoPrice: 220,
      unit: "piece"
    },
    {
      folder: 6,
      name: "Aluminium Mobile Scaffolding Stabilizer Clamp",
      group: "scaffolding-components",
      demoPrice: 450,
      unit: "piece"
    },
    {
      folder: 7,
      name: "Beam Clamp",
      group: "clamps-connectors",
      demoPrice: 350,
      unit: "piece"
    },
    {
      folder: 8,
      name: "Aluminium Mobile Scaffolding 2 Way Connector",
      group: "scaffolding-components",
      demoPrice: 380,
      unit: "piece"
    },
    {
      folder: 9,
      name: "Aluminium Scaffolding Die Casting (For Jointing Parts)",
      group: "scaffolding-components",
      demoPrice: 280,
      unit: "piece"
    },
    {
      folder: 10,
      name: "Aluminium Scaffolding Diecast Pivot Plug",
      group: "scaffolding-components",
      demoPrice: 190,
      unit: "piece"
    },
    {
      folder: 11,
      name: "Aluminium Mobile Scaffloding T Joint",
      group: "scaffolding-components",
      demoPrice: 320,
      unit: "piece"
    },
    {
      folder: 12,
      name: "APS Base Plate",
      group: "base-support",
      demoPrice: 300,
      unit: "piece"
    },
    {
      folder: 13,
      name: "Rubber Pad",
      group: "base-support",
      demoPrice: 90,
      unit: "piece"
    },
    {
      folder: 14,
      name: "Aluminium Stage Bottom Bush",
      group: "stage-components",
      demoPrice: 100,
      unit: "piece"
    },
    {
      folder: 15,
      name: "Aluminium ladder Bottom Bush",
      group: "base-support",
      demoPrice: 80,
      unit: "piece"
    },
    {
      folder: 16,
      name: "APS Scaffolding Joint Pin",
      group: "pins-fasteners",
      demoPrice: 140,
      unit: "piece"
    },
    {
      folder: 17,
      name: "APS Scaffolding - Swivel Coupler",
      group: "clamps-connectors",
      demoPrice: 280,
      unit: "piece"
    },
    {
      folder: 18,
      name: "Ringlock scaffolding Joint pin",
      group: "pins-fasteners",
      demoPrice: 150,
      unit: "piece"
    },
    {
      folder: 19,
      name: "Ringlock scaffolding Bolt & Nut",
      group: "pins-fasteners",
      demoPrice: 45,
      unit: "set"
    },
    {
      folder: 20,
      name: "Ringlock scaffolding Joint pin with Bolt Nut",
      group: "pins-fasteners",
      demoPrice: 190,
      unit: "set"
    },
    {
      folder: 21,
      name: "Scaffolding Steel Four Way Fork",
      group: "base-support",
      demoPrice: 650,
      unit: "piece"
    },
    {
      folder: 22,
      name: "Aluminium Stage 1 Feet Column Post",
      group: "stage-components",
      demoPrice: 750,
      unit: "piece",
      suppliedSpecification: "1 Feet Column Post"
    },
    {
      folder: 23,
      name: "Ringlock Scaffolding Base Collar",
      group: "ringlock-components",
      demoPrice: 450,
      unit: "piece"
    },
    {
      folder: 24,
      name: "Aluminium Stage 1.5 Feet Column Post",
      group: "stage-components",
      demoPrice: 950,
      unit: "piece",
      suppliedSpecification: "1.5 Feet Column Post"
    },
    {
      folder: 25,
      name: "APS Scaffolding Adjustable Base Jack",
      group: "base-support",
      demoPrice: 850,
      unit: "piece"
    },
    {
      folder: 26,
      name: "Aluminium Mobile Scaffolding Wheel (With Break)",
      group: "wheels-accessories",
      demoPrice: 1200,
      unit: "piece"
    },
    {
      folder: 27,
      name: "APS Scaffolding Adjustable U Jack",
      group: "base-support",
      demoPrice: 900,
      unit: "piece"
    },
    {
      folder: 28,
      name: "Ringlock LED Clamp",
      group: "clamps-connectors",
      demoPrice: 450,
      unit: "piece"
    },
    {
      folder: 29,
      name: "APS Scaffolding - 4 Feet Horizontal",
      group: "scaffolding-components",
      demoPrice: 1400,
      unit: "piece",
      suppliedSpecification: "4 Feet Horizontal"
    },
    {
      folder: 30,
      name: "Aluminium Stage Top Brazing",
      group: "stage-components",
      demoPrice: 1600,
      unit: "piece"
    },
    {
      folder: 31,
      name: "Aluminium Stage Bottom Brazing",
      group: "stage-components",
      demoPrice: 1600,
      unit: "piece"
    },
    {
      folder: 32,
      name: "APS Scaffolding - 6 Feet Vertical",
      group: "scaffolding-components",
      demoPrice: 2200,
      unit: "piece",
      suppliedSpecification: "6 Feet Vertical"
    },
    {
      folder: 33,
      name: "Aluminium Stage Deck Plywood with Frame (4X4)",
      group: "stage-components",
      demoPrice: 6500,
      unit: "piece",
      suppliedSpecification:
        "4X4 as supplied in the title; dimension units to be confirmed"
    },
    {
      folder: 34,
      name: "Aluminium Stage Deck Frame (4X4)",
      group: "stage-components",
      demoPrice: 4500,
      unit: "piece",
      suppliedSpecification:
        "4X4 as supplied in the title; dimension units to be confirmed"
    },
    {
      folder: 35,
      name: "Ringlock Scaffolding Tower",
      group: "towers",
      demoPrice: 35000,
      unit: "set"
    },
    {
      folder: 36,
      name: "Aluminium Mobile Scaffolding Tower",
      group: "towers",
      demoPrice: 45000,
      unit: "set"
    },
    {
      folder: 37,
      name: "Ringlock Scaffolding - 3.05 X 2 M Diagonal Brace",
      group: "ringlock-components",
      demoPrice: 2400,
      unit: "piece",
      suppliedSpecification: "3.05 × 2 m Diagonal Brace"
    },
    {
      folder: 38,
      name: "Aluminium Scaffolding Horizontal And Diagonal Brace",
      group: "scaffolding-components",
      demoPrice: 1800,
      unit: "piece"
    },
    {
      folder: 39,
      name: "Aluminium Scaffolding . 2 Rung 1350 Span Frame H : 800 mm",
      group: "frames-platforms",
      demoPrice: 4200,
      unit: "piece",
      suppliedSpecification:
        "2 Rung; 1350 Span; Height: 800 mm. Span unit to be confirmed."
    },
    {
      folder: 40,
      name: "Aluminium Scaffolding Tower - Platform L : 2000 mm",
      group: "frames-platforms",
      demoPrice: 6500,
      unit: "piece",
      suppliedSpecification: "Platform Length: 2000 mm"
    },
    {
      folder: 41,
      name: "Aluminium Scaffolding - 5 Rung 1350 Span Frame H: 2000 mm",
      group: "frames-platforms",
      demoPrice: 7800,
      unit: "piece",
      suppliedSpecification:
        "5 Rung; 1350 Span; Height: 2000 mm. Span unit to be confirmed."
    },
    {
      folder: 42,
      name: "Ringlock Scaffolding - 1 M Vertical",
      group: "ringlock-components",
      demoPrice: 1100,
      unit: "piece",
      suppliedSpecification: "1 m Vertical"
    },
    {
      folder: 43,
      name: "Ringlock Scaffolding - 1.5 M Vertical",
      group: "ringlock-components",
      demoPrice: 1500,
      unit: "piece",
      suppliedSpecification: "1.5 m Vertical"
    },
    {
      folder: 44,
      name: "Ringlock Scaffolding - 2 M Vertical",
      group: "ringlock-components",
      demoPrice: 1900,
      unit: "piece",
      suppliedSpecification: "2 m Vertical"
    }
  ];

  const CUSTOM_GROUPS = [
    { id: "scaffolding-components", name: "Scaffolding Components" },
    { id: "stage-components", name: "Stage Components" },
    { id: "ringlock-components", name: "Ringlock Components" },
    { id: "clamps-connectors", name: "Clamps & Connectors" },
    { id: "pins-fasteners", name: "Pins & Fasteners" },
    { id: "base-support", name: "Base & Support Components" },
    { id: "wheels-accessories", name: "Wheels & Accessories" },
    { id: "frames-platforms", name: "Frames & Platforms" },
    { id: "towers", name: "Scaffolding Towers" }
  ];

  function getGroupName(groupId) {
    const group = CUSTOM_GROUPS.find(function (item) {
      return item.id === groupId;
    });

    return group ? group.name : "Custom Products";
  }

  /*
   * Demo variants only.
   *
   * The alternate price is generated to demonstrate price changes.
   * It is not a pricing recommendation.
   *
   * Add a real "variants" array to a custom product row
   * when final variant information becomes available.
   */

  function makeCustomVariants(row, productId) {
    const standardName = row.suppliedSpecification
      ? row.suppliedSpecification + " — Demo"
      : "Standard Option — Demo";

    return [
      {
        id: productId + "-standard",
        name: standardName,

        purchasePrice: row.demoPrice,
        purchaseUnit: row.unit,
        rental: null,

        specifications: [
          {
            label: "Variant",
            value:
              row.suppliedSpecification || "Standard option — placeholder"
          },
          {
            label: "Final specification",
            value: "Dimensions, material grade, and finish to be confirmed"
          }
        ],

        isDemo: true
      },
      {
        id: productId + "-alternate",
        name: "Alternate Option — Demo",

        purchasePrice: Math.round(row.demoPrice * 1.25),
        purchaseUnit: row.unit,
        rental: null,

        specifications: [
          {
            label: "Variant",
            value: "Alternate option — placeholder"
          },
          {
            label: "Final specification",
            value: "Actual alternate size or specification to be confirmed"
          }
        ],

        isDemo: true
      }
    ];
  }

  function makeCustomProduct(row) {
    const paddedNumber = String(row.folder).padStart(2, "0");
    const productId = "custom-" + paddedNumber;

    return {
      id: productId,
      number: row.folder,

      name: row.name,
      slug: slugify(row.name),

      category: "custom-products",
      categoryLabel: "Custom Products",

      group: row.group,
      groupLabel: getGroupName(row.group),

      type: "custom",
      page: "pages/product.html?id=" + productId,

      description:
        row.name +
        ". Select a variant and quantity to preview its purchase amount. " +
        "Prices and generated variant options are demonstration data. " +
        "Final product specifications and compatibility must be confirmed.",

      images: [
        "images/" + row.folder + "/1.jpg",
        "images/" + row.folder + "/2.jpg",
        "images/" + row.folder + "/3.jpg"
      ],

      purchaseEnabled: true,
      rentalEnabled: false,
      isDemo: true,

      specifications: [
        {
          label: "Product",
          value: row.name
        },
        {
          label: "Catalogue group",
          value: getGroupName(row.group)
        },
        {
          label: "Specification supplied",
          value: row.suppliedSpecification || "To be confirmed"
        },
        {
          label: "Price unit",
          value: "Per " + row.unit + " — demo unit, confirm before launch"
        },
        {
          label: "Availability",
          value: "To be confirmed"
        }
      ],

      variants: row.variants || makeCustomVariants(row, productId)
    };
  }

  const CUSTOM_PRODUCTS = CUSTOM_PRODUCT_ROWS.map(makeCustomProduct);
  const ALL_PRODUCTS = MAIN_PRODUCTS.concat(CUSTOM_PRODUCTS);

  function getProduct(productId) {
    return ALL_PRODUCTS.find(function (product) {
      return product.id === productId;
    }) || null;
  }

  function getVariant(productId, variantId) {
    const product = getProduct(productId);

    if (!product) {
      return null;
    }

    return product.variants.find(function (variant) {
      return variant.id === variantId;
    }) || null;
  }

  function getMainProduct(category) {
    return MAIN_PRODUCTS.find(function (product) {
      return product.category === category || product.id === category;
    }) || null;
  }

  function getCustomProducts(groupId) {
    if (!groupId || groupId === "all") {
      return CUSTOM_PRODUCTS.slice();
    }

    return CUSTOM_PRODUCTS.filter(function (product) {
      return product.group === groupId;
    });
  }

  function searchCustomProducts(query, groupId) {
    const search = String(query || "").trim().toLowerCase();

    return getCustomProducts(groupId).filter(function (product) {
      if (!search) {
        return true;
      }

      const searchableText = [
        product.name,
        product.groupLabel,
        product.description
      ].join(" ").toLowerCase();

      return searchableText.includes(search);
    });
  }

  function getStartingPurchasePrice(product) {
    if (!product || !product.purchaseEnabled) {
      return null;
    }

    const prices = product.variants
      .map(function (variant) {
        return variant.purchasePrice;
      })
      .filter(function (price) {
        return Number.isFinite(price) && price >= 0;
      });

    return prices.length ? Math.min.apply(null, prices) : null;
  }

  function formatMoney(amount) {
    if (!Number.isFinite(amount)) {
      return "Price on enquiry";
    }

    return new Intl.NumberFormat(SETTINGS.locale, {
      style: "currency",
      currency: SETTINGS.currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(amount);
  }

  function getProductPage(productId) {
    const product = getProduct(productId);
    return product ? product.page : null;
  }

  function validateCatalogue() {
    const errors = [];
    const productIds = new Set();
    const variantIds = new Set();

    if (CUSTOM_PRODUCTS.length !== 44) {
      errors.push("Expected 44 custom products.");
    }

    ALL_PRODUCTS.forEach(function (product) {
      if (productIds.has(product.id)) {
        errors.push("Duplicate product ID: " + product.id);
      }

      productIds.add(product.id);

      if (
        !product.name ||
        !Array.isArray(product.variants) ||
        !product.variants.length
      ) {
        errors.push("Missing name or variants: " + product.id);
        return;
      }

      if (product.type === "custom" && product.rentalEnabled) {
        errors.push(
          "Custom products must be purchase-only: " + product.id
        );
      }

      product.variants.forEach(function (variant) {
        if (variantIds.has(variant.id)) {
          errors.push("Duplicate variant ID: " + variant.id);
        }

        variantIds.add(variant.id);

        if (
          variant.purchasePrice !== null &&
          (
            !Number.isFinite(variant.purchasePrice) ||
            variant.purchasePrice < 0
          )
        ) {
          errors.push("Invalid purchase price: " + variant.id);
        }

        if (
          product.rentalEnabled &&
          (
            !variant.rental ||
            !Number.isFinite(variant.rental.rate) ||
            variant.rental.rate < 0 ||
            !["day", "week", "month"].includes(variant.rental.period) ||
            !Number.isInteger(variant.rental.minimumPeriods) ||
            variant.rental.minimumPeriods < 1
          )
        ) {
          errors.push("Invalid rental details: " + variant.id);
        }
      });
    });

    if (errors.length) {
      console.error("CGR catalogue validation:", errors);
    }

    return errors;
  }

  /*
   * Public API used by store.js and main.js.
   * Keep these property names unchanged.
   */

  window.CGR = {
    settings: SETTINGS,

    mainProducts: MAIN_PRODUCTS,
    customProducts: CUSTOM_PRODUCTS,
    products: ALL_PRODUCTS,
    customGroups: CUSTOM_GROUPS,

    getProduct: getProduct,
    getVariant: getVariant,
    getMainProduct: getMainProduct,
    getCustomProducts: getCustomProducts,
    searchCustomProducts: searchCustomProducts,
    getStartingPurchasePrice: getStartingPurchasePrice,
    getProductPage: getProductPage,
    formatMoney: formatMoney,
    validateCatalogue: validateCatalogue
  };

  validateCatalogue();
})();
