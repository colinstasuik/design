document.addEventListener('DOMContentLoaded', function () {
    // Selecting the project title elements
    const projectTitles = document.querySelectorAll('.project-title');
    // Selecting the slideshow project divs
    const slideshowProjects = document.querySelectorAll('.slideshow-project');

    // Create a variable to keep track of which project is currently active
    let currentProjectIndex = 0;

    // Function to select and display a specific project
    function showProject(index) {
        projectTitles.forEach(title => {
            title.classList.remove('active-title');
        });

        projectTitles[index].classList.add('active-title');

        slideshowProjects.forEach((project, i) => {
            project.classList.remove('active');
        });
        slideshowProjects[index].classList.add('active');
        const firstImage = slideshowProjects[index].querySelector('img');
        firstImage.style.display = 'block'; // Show the first image in the project
    }


    // Function to cycle through the images in the active project
    function cycleImages(project) {
        const images = project.querySelectorAll('img');
        let currentImageIndex = 0;

        images.forEach(img => img.style.display = 'none'); // Hide all images initially

        images[currentImageIndex].style.display = 'block'; // Show the first image

        project.addEventListener('click', (event) => {
            const clickX = event.offsetX;
            const elementWidth = project.offsetWidth;

            if (clickX < elementWidth / 2) {
                currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
            } else {
                currentImageIndex = (currentImageIndex + 1) % images.length;
            }

            images.forEach(img => img.style.display = 'none'); // Hide all images
            images[currentImageIndex].style.display = 'block'; // Show the next image
        });

        // Custom cursor
        project.addEventListener('mousemove', (event) => {
            const rect = project.getBoundingClientRect();
            const mouseX = event.clientX - rect.left;
            const halfWidth = rect.width / 2;

            if (mouseX < halfWidth) {
                project.classList.add('left-cursor');
                project.classList.remove('right-cursor');
            } else {
                project.classList.add('right-cursor');
                project.classList.remove('left-cursor')
            }
        });


        project.addEventListener('mouseleave', () => {
            project.classList.remove('left-cursor', 'right-cursor');
        });
    }

    // Show the initial project and start the image cycling
    showProject(currentProjectIndex);
    cycleImages(slideshowProjects[currentProjectIndex]);

    // Add event listeners to project titles to switch between projects
    projectTitles.forEach((title, index) => {
        title.addEventListener('click', () => {
            currentProjectIndex = index;
            showProject(currentProjectIndex);
            cycleImages(slideshowProjects[currentProjectIndex]);
        });
    });

});
