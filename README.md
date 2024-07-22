# Crop-Mapping (Graduation Project)
## Overview
This project focuses on the classification of land cover and agricultural crops in the Al-Faiyum region of Egypt using Sentinel-2A satellite imagery and deep learning techniques. By leveraging a Convolutional Neural Network (CNN) architecture, we achieved an impressive 95% accuracy across seven classes, including clover, wheat, and urban areas. This work provides valuable insights for resource management and agricultural planning.

In addition, we developed a user-friendly website to visualize and interact with our classification results. The website enhances accessibility for stakeholders and decision-makers, allowing them to explore the classified land cover data seamlessly.

## Dataset Description
This dataset focuses on the classification of agricultural and non-agricultural land cover types in the Al-Faiyum region of Egypt using Sentinel-2A satellite imagery. The imagery, captured from January to March 2016, covers 10 spectral bands and spans geographical coordinates from approximately 29.00° to 29.40° North latitude and 30.50° to 31.00° East longitude. The classification scheme categorizes the region into seven classes: clover, wheat, trees, background, water, urban, and land. This data helps in understanding the spatial distribution of various elements, aiding resource management and agricultural planning. Ground truth datasets were used to create testing and training datasets for model development.

We are grateful to the **National Authority for Remote Sensing and Space Sciences** [NARSS](https://github.com/NARSS) for providing us with the dataset.
## Website
  ### Front-End
  The front end of the project is located in the `Front-End` folder or from [here](./Front-End). It is built using React and Tailwind CSS to provide a seamless and interactive user experience. This allows stakeholders to easily explore the classified land cover data.
  
  The `Screens` folder contains visual representations of the website's user interface. These screenshots provide an overview of the different screens and features of the website, showcasing the design and layout. You can view the folder [here](./Screens).
  
  ### Back-End
  The backend is split into two separate files:
  - Node.js: Located in the `Nodejs-Backend` file, used for query and creating dashboard collections.
  - Django: Located in the `Django-Backend` file, handles image preprocessing, loading the model, and crop classification.
  ### Database
  We use **MySQL** to store and manage data such as classification results and user information and **Prisma ORM** to interact with MySQL.
  

  
## Team 
- [Mahmoud Sanad](https://github.com/Mahmoud-Sanad)
- [Menna Tarek](https://github.com/Menna-Tarek21)
- [Motaz Essam](https://github.com/motaz-14)
- [Reem Aliraqi](https://github.com/reemaliraqi)
- [Anas Mohamed](https://github.com/BluriXWRLD)
