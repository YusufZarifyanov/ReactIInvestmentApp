export const upsDowns = {
  ups: {
    name: "Взлеты",
    data: [
      {
        name: "Mercedes",
        count: 2,
        cost: 41.92,
        currency: "$",
        src: "data:image/png;base64,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",
        is_active: true,
        value: 12.89,
        tiker: "C"
      },
      {
        name: "BMW",
        count: 4,
        cost: 124.83,
        currency: "$",
        src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSl4oSele1C8eL7Sf0mBKbvEkoRccqaIKSCNQ&usqp=CAU",
        is_active: true,
        value: 11.89,
        tiker: "U"
      },
      {
        name: "Amazon",
        count: 1,
        cost: 3206.22,
        currency: "$",
        src: "data:image/png;base64,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",
        is_active: true,
        value: 12,
        tiker: "AMZN"
      },
    ]
  },
  downs: {
    name: "Падения",
    data: [
      {
        name: "Porche",
        count: 1,
        cost: 41.92,
        currency: "$",
        src: "data:image/png;base64,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",
        is_active: false,
        value: 11.89,
        tiker: "E"
      },
      {
        name: "LADA",
        count: 2,
        cost: 41.92,
        currency: "$",
        src: "https://cdn.fishki.net/upload/post/201504/06/1492507/6_011.jpg",
        is_active: false,
        value: 11.89,
        tiker: "Z"
      },
      {
        name: "Nissan",
        count: 1,
        cost: 41.92,
        currency: "$",
        src: "https://img-fotki.yandex.ru/get/6811/156901496.72/0_19f408_42576c04_XL.jpg",
        is_active: false,
        value: 11.89,
        tiker: "J"
      },
      {
        name: "TESLA",
        count: 2,
        cost: 41.92,
        currency: "$",
        src: "data:image/png;base64,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",
        is_active: false,
        value: 11.89,
        tiker: "O"
      },
      {
        name: "Hyundai",
        count: 2,
        cost: 41.92,
        currency: "$",
        src: "https://b.radikal.ru/b37/1808/16/2bb795d49717.jpg",
        is_active: false,
        value: 11.89,
        tiker: "G"
      },
    ],
  }
}