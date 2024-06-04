import { render, screen } from '@testing-library/react'

import ProductImageGallery from '../../src/components/ProductImageGallery'


describe('ProductImageGallery', () => {
    it('should render nothing if given an empty array', () => {
        const result = render(<ProductImageGallery imageUrls={[]} />)
        expect(result.container).toBeEmptyDOMElement()
    })

    it('should render a list of images', () => {
        const imageUrls: string[] = ['image1.jpg', 'image2.jpg']
        render(<ProductImageGallery imageUrls={imageUrls}/>)
        const images = screen.getAllByRole('img')
        expect(images).toHaveLength(imageUrls.length)
        images.forEach((img, index) => {
            expect(img).toHaveAttribute('src', imageUrls[index])
        })
    })
})