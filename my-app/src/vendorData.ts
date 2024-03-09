const vendorData = [
    {
        id: 1,
        name: "Steven's Wedding Photography",
        type: 'photography',
        price: 1500,
        photos: ['/vendorphotos/photography/stevensweddingphotography/photo1.jpeg'],
        reviews: [
          {
            rating: 5,
            review: 'Captured our special moments beautifully',
          },
          {
            rating: 4,
            review: 'Professional and friendly photographer',
          },
        ],
        details: 'We specialize in capturing the essence of your wedding day through stunning photography.',
        contact: 'Email: info@stevensweddingphotographyexpress.com, Phone: 111-222-3333',
    },
    {
        id: 2,
        name: 'Capture The Moment',
        type: 'photography',
        price: 2000,
        photos: ['/vendorphotos/photography/capturethemoment/photo1.jpeg'],
        reviews: [
          {
            rating: 4,
            review: 'Great experience working with this photography team',
          },
          {
            rating: 5,
            review: 'Highly recommended for their creativity and professionalism',
          },
        ],
        details: 'We are dedicated to capturing the joy and love of your wedding day through our lens.',
        contact: 'Email: info@capturethemoment.com, Phone: 444-555-6666',
    },
    {
        id: 3,
        name: 'Dream Shots',
        type: 'photography',
        price: 1800,
        photos: ['/vendorphotos/photography/dreamshots/photo1.jpeg'],
        reviews: [
          {
            rating: 5,
            review: 'They made our wedding dreams come true with their amazing shots',
          },
          {
            rating: 4,
            review: 'Talented photographers with an eye for detail',
          },
        ],
        details: 'We turn your wedding dreams into reality through our exceptional photography services.',
        contact: 'Email: info@dreamshots.com, Phone: 777-888-9999',
    },
    {
      id: 4,
      name: "Martha's Vineyard",
      type: 'venue',
      price: 15000,
      photos: ['/vendorPhotos/venue/marthasvineyard/photo1.webp'],
      reviews: [
        {
          rating: 4,
          review: 'Beautiful venue with stunning views',
        },
        {
          rating: 5,
          review: 'Perfect place for a dream wedding',
        },
      ],
      details: 'Breathtaking venue with picturesque landscapes and luxurious amenities.',
      contact: "Email: info@marthasvineyard.com, Phone: 123-456-7890",
    },
    {
      id: 5,
      name: 'Elegant Affairs',
      type: 'venue',
      price: 6000,
      photos: ['/vendorPhotos/venue/elegantaffairs/photo1.jpeg'],
      reviews: [
        {
          rating: 5,
          review: 'Great experience',
        },
        {
          rating: 3,
          review: 'Enjoyed my time but too expensive and not responsive',
        },
      ],
      details:
        "We offer a great venue for all weddings. Whether you're looking for your next destination wedding or a small get together with your family, we have it all.",
      contact: 'Reach out to us at elegantaffairs@gmail.com or 408 555 5555',
    },
    {
      id: 6,
      name: 'Celebrate in Style',
      type: 'venue',
      price: 3500,
      photos: ['/vendorPhotos/venue/celebrateinstyle/photo1.jpg'],
      reviews: [
        {
          rating: 4,
          review: 'Affordable and stylish venue',
        },
        {
          rating: 5,
          review: 'Had an amazing wedding experience here',
        },
      ],
      details: 'Celebrate your special day in style at our elegant and affordable venue.',
      contact: 'Contact us at info@celebrateinstyle.com or 987-654-3210',
    },
    {
        id: 7,
        name: 'Gourmet Wedding Feasts',
        type: 'catering',
        price: 3000,
        photos: ['/vendorphotos/catering/gourmetweddingfeasts/photo1.jpeg'],
        reviews: [
          {
            rating: 5,
            review: 'Delicious food and impeccable service',
          },
          {
            rating: 4,
            review: 'Our guests were raving about the catering',
          },
        ],
        details: 'We provide gourmet catering services to make your wedding feast unforgettable.',
        contact: 'Email: info@gourmetweddingfeasts.com, Phone: 222-333-4444',
    },
    {
        id: 8,
        name: 'Savory Celebrations',
        type: 'catering',
        price: 3500,
        photos: ['/vendorphotos/catering/savorycelebrations/photo1.webp'],
        reviews: [
          {
            rating: 4,
            review: 'Great variety of dishes and attentive staff',
          },
          {
            rating: 5,
            review: 'They made our wedding dining experience memorable',
          },
        ],
        details: 'We offer a wide range of savory dishes to celebrate your special day.',
        contact: 'Email: info@savorycelebrations.com, Phone: 555-666-7777',
    },
    {
        id: 9,
        name: 'Bites and Delights',
        type: 'catering',
        price: 2800,
        photos: ['/vendorphotos/catering/bitesanddelights/photo1.jpeg'],
        reviews: [
          {
            rating: 5,
            review: 'Mouthwatering bites and delightful presentation',
          },
          {
            rating: 4,
            review: 'They catered to all our dietary needs flawlessly',
          },
        ],
        details: 'We create delightful bites and delicious dishes to make your wedding catering exceptional.',
        contact: 'Email: info@bitesanddelights.com, Phone: 888-999-0000',
    },
  ];
  
  export default vendorData;