# ImageReconstruction
In this repo I'll be creating an elementary Python algorithm (and testing it!) for image reconstruction.

What we'll do for the current scope is: given an image file (maybe limited to .jpg for now for ease of use/implementation), we'll split that image into (initially) uniformly-sized sub-image rectangles (where split size is designated by user input).  We'll also allow the user to input a degree to which these sub-images overlap (>0 rows of pixels on all 4 sides).

From here, we'll erase the information about how the different sub-images are spatially related.  We'll then introduce an (again, user-designated) amount of distortion/corruption to each of the sub-images.  Finally, an algorithm will attempt to arrange the scrambled subimages into an organized graph of spatial relationships, and from there attempt to reconstruct the original image (or its slightly-corrupted counterpart).

Time limitations will put some hard limits on scope of the problem (relative to real-world image reconstruction tasks), but it should still be fun.  Thanks for checking it out!

-Brad Martin
(bmartin@mines.edu/brma7253@colorado.edu)
180424
