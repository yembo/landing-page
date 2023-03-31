# A customizable landing page integrated into Yembo

This landing page is provided free of charge ([see license](LICENSE)) and is intended for Yembo clients to be able to quickly and easily integrate a Yembo survey link into their landing page. 

The repo contains responsive, [valid HTML 5 markup](https://validator.w3.org/) that can be easily customized with client branding to create a custom landing page integrated with Yembo. 

## Configuring Yembo to allow the use of a custom lander

In order to use this lander (or one derived from it), your company in Yembo needs to be configured with the domain(s) you will be using this lander from. Please contact our [customer success team](mailto:customersuccess@yembo.ai) and provide them with a list of the domains where you will be hosting this lander. (This includes any domains used in testing the lander prior to deployment.)

## Customizations 
The following customizations are recommended: 

### In `index.js`
1. If you log into Yembo's North American environment (https://app.yembo.ai), you do not need to make any changes.
2. If you log into Yembo's European environment (https://app.yembo.eu), replace `https://api-us.mariner.yembo.ai` with `https://api-eu.mariner.yembo.ai`
3. If you log into Yembo's Asia-Pacific environment (https://app.yembo.com.sg), replace `https://api-us.mariner.yembo.ai` with `https://api-sg.mariner.yembo.ai`

### In `styles.css`
1. Replace `--company-color` with the hex code of your company's color
2. Replace `--company-color-hover-dark` with a darker version of your company's color, for use in hover effects
3. Replace `--company-mobile-bg-darker` with a dark color that works well with your company's palette
4. Replace `--error-color` with your desired error message color

### In `index.html`
1. Replace `YOUR_COMPANY_HERE` with your company's name
2. Replace `YOUR_REVIEW_PAGE_HERE` with a link to your public review page (e.g., Yelp, Google, Facebook)
3. Replace `YOUR_PHONE_HERE` with your company's phone number

### Other
1. Replace `company-logo.png` with your company's logo

## Getting support
Contact [customersuccess@yembo.ai](mailto:customersuccess@yembo.ai)