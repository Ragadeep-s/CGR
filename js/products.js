/* CGR catalogue: demo prices only. Browser and Node.js compatible.
 * Main images use 1.jpg through 5.jpg. Remove missing image paths.
 * Custom catalogue retained for future use; flag does not hide existing HTML links.
 */
(function () {
  "use strict";
  const SETTINGS = {
  "currency": "INR",
  "locale": "en-IN",
  "demoMode": true,
  "customProductsEnabled": false,
  "pricingNotice": "Demo prices and specifications only. Confirm final details before ordering.",
  "taxNotice": "Checkout tax and delivery are demonstration values only.",
  "checkoutEnabled": false,
  "paymentsEnabled": false,
  "basketStorageKey": "cgr-basket-v1",
  "contact": {
    "whatsappNumber": "+919790222381",
    "phoneNumber": "+919790222381",
    "email": "sn@cgrfc.com"
  }
};
  const MAIN_PRODUCTS = [
  {
    "id": "main-aluminium-scaffolding",
    "name": "Aluminium Scaffolding",
    "slug": "aluminium-scaffolding",
    "category": "aluminium-scaffolding",
    "categoryLabel": "Aluminium Scaffolding",
    "type": "main",
    "page": "pages/aluminium-scaffolding.html",
    "description": "Explore aluminium scaffolding configurations for purchase or rental. Prices, configurations and specifications are demonstration data. Final dimensions, component lists, suitability and availability require confirmation.",
    "images": [
      "images/aluminium-scaffolding/1.jpg",
      "images/aluminium-scaffolding/2.jpg",
      "images/aluminium-scaffolding/3.jpg",
      "images/aluminium-scaffolding/4.jpg",
      "images/aluminium-scaffolding/5.jpg"
    ],
    "purchaseEnabled": true,
    "rentalEnabled": true,
    "isDemo": true,
    "specifications": [
      {
        "label": "Product category",
        "value": "Aluminium Scaffolding"
      },
      {
        "label": "Technical specifications",
        "value": "Materials, dimensions and component details to be confirmed"
      },
      {
        "label": "Purchase pricing",
        "value": "Demo amount per set"
      },
      {
        "label": "Rental pricing",
        "value": "Demo amount per set per day"
      },
      {
        "label": "Availability",
        "value": "To be confirmed"
      }
    ],
    "variants": [
      {
        "id": "aluminium-scaffolding-demo-compact",
        "name": "Compact Configuration — Demo",
        "purchasePrice": 45000,
        "purchaseUnit": "set",
        "rental": {
          "rate": 600,
          "period": "day",
          "minimumPeriods": 1,
          "deposit": null,
          "deliveryNote": "Delivery and collection charges to be confirmed.",
          "installationNote": "Installation requirements and charges to be confirmed.",
          "isDemo": true
        },
        "specifications": [
          {
            "label": "Configuration",
            "value": "Compact Configuration — placeholder"
          },
          {
            "label": "Dimensions",
            "value": "To be confirmed"
          },
          {
            "label": "Included components",
            "value": "Final component list to be confirmed"
          },
          {
            "label": "Technical information",
            "value": "Dimensions, load ratings, and suitability must be confirmed before use."
          }
        ],
        "isDemo": true
      },
      {
        "id": "aluminium-scaffolding-demo-standard",
        "name": "Standard Configuration — Demo",
        "purchasePrice": 65000,
        "purchaseUnit": "set",
        "rental": {
          "rate": 850,
          "period": "day",
          "minimumPeriods": 1,
          "deposit": null,
          "deliveryNote": "Delivery and collection charges to be confirmed.",
          "installationNote": "Installation requirements and charges to be confirmed.",
          "isDemo": true
        },
        "specifications": [
          {
            "label": "Configuration",
            "value": "Standard Configuration — placeholder"
          },
          {
            "label": "Dimensions",
            "value": "To be confirmed"
          },
          {
            "label": "Included components",
            "value": "Final component list to be confirmed"
          },
          {
            "label": "Technical information",
            "value": "Dimensions, load ratings, and suitability must be confirmed before use."
          }
        ],
        "isDemo": true
      },
      {
        "id": "aluminium-scaffolding-demo-extended",
        "name": "Extended Configuration — Demo",
        "purchasePrice": 85000,
        "purchaseUnit": "set",
        "rental": {
          "rate": 1100,
          "period": "day",
          "minimumPeriods": 1,
          "deposit": null,
          "deliveryNote": "Delivery and collection charges to be confirmed.",
          "installationNote": "Installation requirements and charges to be confirmed.",
          "isDemo": true
        },
        "specifications": [
          {
            "label": "Configuration",
            "value": "Extended Configuration — placeholder"
          },
          {
            "label": "Dimensions",
            "value": "To be confirmed"
          },
          {
            "label": "Included components",
            "value": "Final component list to be confirmed"
          },
          {
            "label": "Technical information",
            "value": "Dimensions, load ratings, and suitability must be confirmed before use."
          }
        ],
        "isDemo": true
      }
    ]
  },
  {
    "id": "main-aluminium-stage",
    "name": "Aluminium Stage",
    "slug": "aluminium-stage",
    "category": "aluminium-stage",
    "categoryLabel": "Aluminium Stage",
    "type": "main",
    "page": "pages/aluminium-stage.html",
    "description": "Explore aluminium stage configurations for purchase or rental. Prices, configurations and specifications are demonstration data. Final dimensions, component lists, suitability and availability require confirmation.",
    "images": [
      "images/aluminium-stage/1.jpg",
      "images/aluminium-stage/2.jpg",
      "images/aluminium-stage/3.jpg",
      "images/aluminium-stage/4.jpg",
      "images/aluminium-stage/5.jpg"
    ],
    "purchaseEnabled": true,
    "rentalEnabled": true,
    "isDemo": true,
    "specifications": [
      {
        "label": "Product category",
        "value": "Aluminium Stage"
      },
      {
        "label": "Technical specifications",
        "value": "Materials, dimensions and component details to be confirmed"
      },
      {
        "label": "Purchase pricing",
        "value": "Demo amount per set"
      },
      {
        "label": "Rental pricing",
        "value": "Demo amount per set per day"
      },
      {
        "label": "Availability",
        "value": "To be confirmed"
      }
    ],
    "variants": [
      {
        "id": "aluminium-stage-demo-compact",
        "name": "Compact Stage Set — Demo",
        "purchasePrice": 30000,
        "purchaseUnit": "set",
        "rental": {
          "rate": 750,
          "period": "day",
          "minimumPeriods": 1,
          "deposit": null,
          "deliveryNote": "Delivery and collection charges to be confirmed.",
          "installationNote": "Installation requirements and charges to be confirmed.",
          "isDemo": true
        },
        "specifications": [
          {
            "label": "Configuration",
            "value": "Compact Stage Set — placeholder"
          },
          {
            "label": "Dimensions",
            "value": "To be confirmed"
          },
          {
            "label": "Included components",
            "value": "Final component list to be confirmed"
          },
          {
            "label": "Technical information",
            "value": "Dimensions, load ratings, and suitability must be confirmed before use."
          }
        ],
        "isDemo": true
      },
      {
        "id": "aluminium-stage-demo-standard",
        "name": "Standard Stage Set — Demo",
        "purchasePrice": 60000,
        "purchaseUnit": "set",
        "rental": {
          "rate": 1500,
          "period": "day",
          "minimumPeriods": 1,
          "deposit": null,
          "deliveryNote": "Delivery and collection charges to be confirmed.",
          "installationNote": "Installation requirements and charges to be confirmed.",
          "isDemo": true
        },
        "specifications": [
          {
            "label": "Configuration",
            "value": "Standard Stage Set — placeholder"
          },
          {
            "label": "Dimensions",
            "value": "To be confirmed"
          },
          {
            "label": "Included components",
            "value": "Final component list to be confirmed"
          },
          {
            "label": "Technical information",
            "value": "Dimensions, load ratings, and suitability must be confirmed before use."
          }
        ],
        "isDemo": true
      },
      {
        "id": "aluminium-stage-demo-expanded",
        "name": "Expanded Stage Set — Demo",
        "purchasePrice": 120000,
        "purchaseUnit": "set",
        "rental": {
          "rate": 3000,
          "period": "day",
          "minimumPeriods": 1,
          "deposit": null,
          "deliveryNote": "Delivery and collection charges to be confirmed.",
          "installationNote": "Installation requirements and charges to be confirmed.",
          "isDemo": true
        },
        "specifications": [
          {
            "label": "Configuration",
            "value": "Expanded Stage Set — placeholder"
          },
          {
            "label": "Dimensions",
            "value": "To be confirmed"
          },
          {
            "label": "Included components",
            "value": "Final component list to be confirmed"
          },
          {
            "label": "Technical information",
            "value": "Dimensions, load ratings, and suitability must be confirmed before use."
          }
        ],
        "isDemo": true
      }
    ]
  },
  {
    "id": "main-ringlock-scaffolding",
    "name": "Ringlock Scaffolding",
    "slug": "ringlock-scaffolding",
    "category": "ringlock-scaffolding",
    "categoryLabel": "Ringlock Scaffolding",
    "type": "main",
    "page": "pages/ringlock-scaffolding.html",
    "description": "Explore ringlock scaffolding configurations for purchase or rental. Prices, configurations and specifications are demonstration data. Final dimensions, component lists, suitability and availability require confirmation.",
    "images": [
      "images/ringlock-scaffolding/1.jpg",
      "images/ringlock-scaffolding/2.jpg",
      "images/ringlock-scaffolding/3.jpg",
      "images/ringlock-scaffolding/4.jpg",
      "images/ringlock-scaffolding/5.jpg"
    ],
    "purchaseEnabled": true,
    "rentalEnabled": true,
    "isDemo": true,
    "specifications": [
      {
        "label": "Product category",
        "value": "Ringlock Scaffolding"
      },
      {
        "label": "Technical specifications",
        "value": "Materials, dimensions and component details to be confirmed"
      },
      {
        "label": "Purchase pricing",
        "value": "Demo amount per set"
      },
      {
        "label": "Rental pricing",
        "value": "Demo amount per set per day"
      },
      {
        "label": "Availability",
        "value": "To be confirmed"
      }
    ],
    "variants": [
      {
        "id": "ringlock-scaffolding-demo-compact",
        "name": "Compact System — Demo",
        "purchasePrice": 40000,
        "purchaseUnit": "set",
        "rental": {
          "rate": 500,
          "period": "day",
          "minimumPeriods": 1,
          "deposit": null,
          "deliveryNote": "Delivery and collection charges to be confirmed.",
          "installationNote": "Installation requirements and charges to be confirmed.",
          "isDemo": true
        },
        "specifications": [
          {
            "label": "Configuration",
            "value": "Compact System — placeholder"
          },
          {
            "label": "Dimensions",
            "value": "To be confirmed"
          },
          {
            "label": "Included components",
            "value": "Final component list to be confirmed"
          },
          {
            "label": "Technical information",
            "value": "Dimensions, load ratings, and suitability must be confirmed before use."
          }
        ],
        "isDemo": true
      },
      {
        "id": "ringlock-scaffolding-demo-standard",
        "name": "Standard System — Demo",
        "purchasePrice": 70000,
        "purchaseUnit": "set",
        "rental": {
          "rate": 900,
          "period": "day",
          "minimumPeriods": 1,
          "deposit": null,
          "deliveryNote": "Delivery and collection charges to be confirmed.",
          "installationNote": "Installation requirements and charges to be confirmed.",
          "isDemo": true
        },
        "specifications": [
          {
            "label": "Configuration",
            "value": "Standard System — placeholder"
          },
          {
            "label": "Dimensions",
            "value": "To be confirmed"
          },
          {
            "label": "Included components",
            "value": "Final component list to be confirmed"
          },
          {
            "label": "Technical information",
            "value": "Dimensions, load ratings, and suitability must be confirmed before use."
          }
        ],
        "isDemo": true
      },
      {
        "id": "ringlock-scaffolding-demo-extended",
        "name": "Extended System — Demo",
        "purchasePrice": 100000,
        "purchaseUnit": "set",
        "rental": {
          "rate": 1300,
          "period": "day",
          "minimumPeriods": 1,
          "deposit": null,
          "deliveryNote": "Delivery and collection charges to be confirmed.",
          "installationNote": "Installation requirements and charges to be confirmed.",
          "isDemo": true
        },
        "specifications": [
          {
            "label": "Configuration",
            "value": "Extended System — placeholder"
          },
          {
            "label": "Dimensions",
            "value": "To be confirmed"
          },
          {
            "label": "Included components",
            "value": "Final component list to be confirmed"
          },
          {
            "label": "Technical information",
            "value": "Dimensions, load ratings, and suitability must be confirmed before use."
          }
        ],
        "isDemo": true
      }
    ]
  }
];
  const CUSTOM_PRODUCT_ROWS = [
  {
    "folder": 1,
    "name": "Aluminium Mobile Scaffolding Horizontal & Diagonal Brace Hook",
    "group": "scaffolding-components",
    "demoPrice": 180,
    "unit": "piece"
  },
  {
    "folder": 2,
    "name": "Aluminium Mobile Scaffolding Bottom Cup",
    "group": "scaffolding-components",
    "demoPrice": 120,
    "unit": "piece"
  },
  {
    "folder": 3,
    "name": "Aluminium Stage Horizontal (Bottom Clamp)",
    "group": "stage-components",
    "demoPrice": 250,
    "unit": "piece"
  },
  {
    "folder": 4,
    "name": "Aluminium Stage Horizontal (Top Clamp)",
    "group": "stage-components",
    "demoPrice": 250,
    "unit": "piece"
  },
  {
    "folder": 5,
    "name": "Aluminium Mobile Scaffolding Round Spigot Connector",
    "group": "scaffolding-components",
    "demoPrice": 220,
    "unit": "piece"
  },
  {
    "folder": 6,
    "name": "Aluminium Mobile Scaffolding Stabilizer Clamp",
    "group": "scaffolding-components",
    "demoPrice": 450,
    "unit": "piece"
  },
  {
    "folder": 7,
    "name": "Beam Clamp",
    "group": "clamps-connectors",
    "demoPrice": 350,
    "unit": "piece"
  },
  {
    "folder": 8,
    "name": "Aluminium Mobile Scaffolding 2 Way Connector",
    "group": "scaffolding-components",
    "demoPrice": 380,
    "unit": "piece"
  },
  {
    "folder": 9,
    "name": "Aluminium Scaffolding Die Casting (For Jointing Parts)",
    "group": "scaffolding-components",
    "demoPrice": 280,
    "unit": "piece"
  },
  {
    "folder": 10,
    "name": "Aluminium Scaffolding Diecast Pivot Plug",
    "group": "scaffolding-components",
    "demoPrice": 190,
    "unit": "piece"
  },
  {
    "folder": 11,
    "name": "Aluminium Mobile Scaffloding T Joint",
    "group": "scaffolding-components",
    "demoPrice": 320,
    "unit": "piece"
  },
  {
    "folder": 12,
    "name": "APS Base Plate",
    "group": "base-support",
    "demoPrice": 300,
    "unit": "piece"
  },
  {
    "folder": 13,
    "name": "Rubber Pad",
    "group": "base-support",
    "demoPrice": 90,
    "unit": "piece"
  },
  {
    "folder": 14,
    "name": "Aluminium Stage Bottom Bush",
    "group": "stage-components",
    "demoPrice": 100,
    "unit": "piece"
  },
  {
    "folder": 15,
    "name": "Aluminium ladder Bottom Bush",
    "group": "base-support",
    "demoPrice": 80,
    "unit": "piece"
  },
  {
    "folder": 16,
    "name": "APS Scaffolding Joint Pin",
    "group": "pins-fasteners",
    "demoPrice": 140,
    "unit": "piece"
  },
  {
    "folder": 17,
    "name": "APS Scaffolding - Swivel Coupler",
    "group": "clamps-connectors",
    "demoPrice": 280,
    "unit": "piece"
  },
  {
    "folder": 18,
    "name": "Ringlock scaffolding Joint pin",
    "group": "pins-fasteners",
    "demoPrice": 150,
    "unit": "piece"
  },
  {
    "folder": 19,
    "name": "Ringlock scaffolding Bolt & Nut",
    "group": "pins-fasteners",
    "demoPrice": 45,
    "unit": "set"
  },
  {
    "folder": 20,
    "name": "Ringlock scaffolding Joint pin with Bolt Nut",
    "group": "pins-fasteners",
    "demoPrice": 190,
    "unit": "set"
  },
  {
    "folder": 21,
    "name": "Scaffolding Steel Four Way Fork",
    "group": "base-support",
    "demoPrice": 650,
    "unit": "piece"
  },
  {
    "folder": 22,
    "name": "Aluminium Stage 1 Feet Column Post",
    "group": "stage-components",
    "demoPrice": 750,
    "unit": "piece",
    "suppliedSpecification": "1 Feet Column Post"
  },
  {
    "folder": 23,
    "name": "Ringlock Scaffolding Base Collar",
    "group": "ringlock-components",
    "demoPrice": 450,
    "unit": "piece"
  },
  {
    "folder": 24,
    "name": "Aluminium Stage 1.5 Feet Column Post",
    "group": "stage-components",
    "demoPrice": 950,
    "unit": "piece",
    "suppliedSpecification": "1.5 Feet Column Post"
  },
  {
    "folder": 25,
    "name": "APS Scaffolding Adjustable Base Jack",
    "group": "base-support",
    "demoPrice": 850,
    "unit": "piece"
  },
  {
    "folder": 26,
    "name": "Aluminium Mobile Scaffolding Wheel (With Break)",
    "group": "wheels-accessories",
    "demoPrice": 1200,
    "unit": "piece"
  },
  {
    "folder": 27,
    "name": "APS Scaffolding Adjustable U Jack",
    "group": "base-support",
    "demoPrice": 900,
    "unit": "piece"
  },
  {
    "folder": 28,
    "name": "Ringlock LED Clamp",
    "group": "clamps-connectors",
    "demoPrice": 450,
    "unit": "piece"
  },
  {
    "folder": 29,
    "name": "APS Scaffolding - 4 Feet Horizontal",
    "group": "scaffolding-components",
    "demoPrice": 1400,
    "unit": "piece",
    "suppliedSpecification": "4 Feet Horizontal"
  },
  {
    "folder": 30,
    "name": "Aluminium Stage Top Brazing",
    "group": "stage-components",
    "demoPrice": 1600,
    "unit": "piece"
  },
  {
    "folder": 31,
    "name": "Aluminium Stage Bottom Brazing",
    "group": "stage-components",
    "demoPrice": 1600,
    "unit": "piece"
  },
  {
    "folder": 32,
    "name": "APS Scaffolding - 6 Feet Vertical",
    "group": "scaffolding-components",
    "demoPrice": 2200,
    "unit": "piece",
    "suppliedSpecification": "6 Feet Vertical"
  },
  {
    "folder": 33,
    "name": "Aluminium Stage Deck Plywood with Frame (4X4)",
    "group": "stage-components",
    "demoPrice": 6500,
    "unit": "piece",
    "suppliedSpecification": "4X4 as supplied in the title; dimension units to be confirmed"
  },
  {
    "folder": 34,
    "name": "Aluminium Stage Deck Frame (4X4)",
    "group": "stage-components",
    "demoPrice": 4500,
    "unit": "piece",
    "suppliedSpecification": "4X4 as supplied in the title; dimension units to be confirmed"
  },
  {
    "folder": 35,
    "name": "Ringlock Scaffolding Tower",
    "group": "towers",
    "demoPrice": 35000,
    "unit": "set"
  },
  {
    "folder": 36,
    "name": "Aluminium Mobile Scaffolding Tower",
    "group": "towers",
    "demoPrice": 45000,
    "unit": "set"
  },
  {
    "folder": 37,
    "name": "Ringlock Scaffolding - 3.05 X 2 M Diagonal Brace",
    "group": "ringlock-components",
    "demoPrice": 2400,
    "unit": "piece",
    "suppliedSpecification": "3.05 × 2 m Diagonal Brace"
  },
  {
    "folder": 38,
    "name": "Aluminium Scaffolding Horizontal And Diagonal Brace",
    "group": "scaffolding-components",
    "demoPrice": 1800,
    "unit": "piece"
  },
  {
    "folder": 39,
    "name": "Aluminium Scaffolding . 2 Rung 1350 Span Frame H : 800 mm",
    "group": "frames-platforms",
    "demoPrice": 4200,
    "unit": "piece",
    "suppliedSpecification": "2 Rung; 1350 Span; Height: 800 mm. Span unit to be confirmed."
  },
  {
    "folder": 40,
    "name": "Aluminium Scaffolding Tower - Platform L : 2000 mm",
    "group": "frames-platforms",
    "demoPrice": 6500,
    "unit": "piece",
    "suppliedSpecification": "Platform Length: 2000 mm"
  },
  {
    "folder": 41,
    "name": "Aluminium Scaffolding - 5 Rung 1350 Span Frame H: 2000 mm",
    "group": "frames-platforms",
    "demoPrice": 7800,
    "unit": "piece",
    "suppliedSpecification": "5 Rung; 1350 Span; Height: 2000 mm. Span unit to be confirmed."
  },
  {
    "folder": 42,
    "name": "Ringlock Scaffolding - 1 M Vertical",
    "group": "ringlock-components",
    "demoPrice": 1100,
    "unit": "piece",
    "suppliedSpecification": "1 m Vertical"
  },
  {
    "folder": 43,
    "name": "Ringlock Scaffolding - 1.5 M Vertical",
    "group": "ringlock-components",
    "demoPrice": 1500,
    "unit": "piece",
    "suppliedSpecification": "1.5 m Vertical"
  },
  {
    "folder": 44,
    "name": "Ringlock Scaffolding - 2 M Vertical",
    "group": "ringlock-components",
    "demoPrice": 1900,
    "unit": "piece",
    "suppliedSpecification": "2 m Vertical"
  }
];
  const CUSTOM_GROUPS = [
  {
    "id": "scaffolding-components",
    "name": "Scaffolding Components"
  },
  {
    "id": "stage-components",
    "name": "Stage Components"
  },
  {
    "id": "ringlock-components",
    "name": "Ringlock Components"
  },
  {
    "id": "clamps-connectors",
    "name": "Clamps & Connectors"
  },
  {
    "id": "pins-fasteners",
    "name": "Pins & Fasteners"
  },
  {
    "id": "base-support",
    "name": "Base & Support Components"
  },
  {
    "id": "wheels-accessories",
    "name": "Wheels & Accessories"
  },
  {
    "id": "frames-platforms",
    "name": "Frames & Platforms"
  },
  {
    "id": "towers",
    "name": "Scaffolding Towers"
  }
];

  function slugify(value) {
    return String(value).toLowerCase().trim().replace(/&/g, " and ")
      .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  }
  function getGroupName(id) {
    const group = CUSTOM_GROUPS.find(item => item.id === id);
    return group ? group.name : "Custom Products";
  }
  function makeCustomProduct(row) {
    const id = "custom-" + String(row.folder).padStart(2, "0");
    const variants = [false, true].map(function (alternate) {
      return {
        id: id + (alternate ? "-alternate" : "-standard"),
        name: alternate ? "Alternate Option — Demo" :
          (row.suppliedSpecification ? row.suppliedSpecification + " — Demo" : "Standard Option — Demo"),
        purchasePrice: alternate ? Math.round(row.demoPrice * 1.25) : row.demoPrice,
        purchaseUnit: row.unit, rental: null, isDemo: true,
        specifications: [
          {label: "Variant", value: alternate ? "Alternate option — placeholder" : (row.suppliedSpecification || "Standard option — placeholder")},
          {label: "Final specification", value: "Dimensions, material grade, and finish to be confirmed"}
        ]
      };
    });
    return {
      id: id, number: row.folder, name: row.name, slug: slugify(row.name),
      category: "custom-products", categoryLabel: "Custom Products",
      group: row.group, groupLabel: getGroupName(row.group), type: "custom",
      page: "pages/product.html?id=" + id,
      description: row.name + ". Prices and generated variants are demonstration data. Final specifications and compatibility require confirmation.",
      images: [1,2,3].map(n => "images/" + row.folder + "/" + n + ".jpg"),
      purchaseEnabled: true, rentalEnabled: false, isDemo: true,
      specifications: [
        {label: "Product", value: row.name},
        {label: "Catalogue group", value: getGroupName(row.group)},
        {label: "Specification supplied", value: row.suppliedSpecification || "To be confirmed"},
        {label: "Price unit", value: "Per " + row.unit + " — demo unit, confirm before launch"},
        {label: "Availability", value: "To be confirmed"}
      ],
      variants: row.variants || variants
    };
  }
  const CUSTOM_PRODUCTS = CUSTOM_PRODUCT_ROWS.map(makeCustomProduct);
  const ALL_PRODUCTS = MAIN_PRODUCTS.concat(CUSTOM_PRODUCTS);
  function getProduct(id) { return ALL_PRODUCTS.find(p => p.id === id) || null; }
  function getVariant(id, variantId) {
    const p = getProduct(id);
    return p ? p.variants.find(v => v.id === variantId) || null : null;
  }
  function getMainProduct(category) {
    return MAIN_PRODUCTS.find(p => p.category === category || p.id === category) || null;
  }
  function getCustomProducts(groupId) {
    return CUSTOM_PRODUCTS.filter(p => !groupId || groupId === "all" || p.group === groupId);
  }
  function searchCustomProducts(query, groupId) {
    const search = String(query || "").trim().toLowerCase();
    return getCustomProducts(groupId).filter(p =>
      [p.name,p.groupLabel,p.description].join(" ").toLowerCase().includes(search));
  }
  function getStartingPurchasePrice(product) {
    if (!product || !product.purchaseEnabled) return null;
    const prices = product.variants.map(v => v.purchasePrice)
      .filter(p => Number.isFinite(p) && p >= 0);
    return prices.length ? Math.min(...prices) : null;
  }
  function formatMoney(amount) {
    return Number.isFinite(amount) ? new Intl.NumberFormat(SETTINGS.locale, {
      style: "currency", currency: SETTINGS.currency,
      minimumFractionDigits: 0, maximumFractionDigits: 2
    }).format(amount) : "Price on enquiry";
  }
  function getProductPage(id) { const p = getProduct(id); return p ? p.page : null; }
  function validateCatalogue() {
    const errors = [], ids = new Set(), variants = new Set();
    if (CUSTOM_PRODUCTS.length !== 44) errors.push("Expected 44 custom products.");
    ALL_PRODUCTS.forEach(function (p) {
      if (ids.has(p.id)) errors.push("Duplicate product: " + p.id);
      ids.add(p.id);
      if (!p.name || !Array.isArray(p.variants) || !p.variants.length)
        errors.push("Missing name or variants: " + p.id);
      if (p.type === "custom" && p.rentalEnabled) errors.push("Custom rental: " + p.id);
      (p.variants || []).forEach(function(v) {
        if (variants.has(v.id)) errors.push("Duplicate variant: " + v.id);
        variants.add(v.id);
        if (v.purchasePrice !== null && (!Number.isFinite(v.purchasePrice) || v.purchasePrice < 0))
          errors.push("Invalid price: " + v.id);
        if (p.rentalEnabled && (!v.rental || !Number.isFinite(v.rental.rate) || v.rental.rate < 0 ||
            !["day","week","month"].includes(v.rental.period) ||
            !Number.isInteger(v.rental.minimumPeriods) || v.rental.minimumPeriods < 1))
          errors.push("Invalid rental: " + v.id);
      });
    });
    if (errors.length) console.error("CGR catalogue validation:", errors);
    return errors;
  }
  const catalogue = {
    settings: SETTINGS, mainProducts: MAIN_PRODUCTS, customProducts: CUSTOM_PRODUCTS,
    products: ALL_PRODUCTS, customGroups: CUSTOM_GROUPS,
    getProduct, getVariant, getMainProduct, getCustomProducts, searchCustomProducts,
    getStartingPurchasePrice, getProductPage, formatMoney, validateCatalogue
  };
  if (typeof window !== "undefined") window.CGR = catalogue;
  if (typeof module !== "undefined" && module.exports) module.exports = catalogue;
  validateCatalogue();
})();
