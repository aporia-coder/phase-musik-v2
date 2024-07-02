import '@testing-library/jest-dom'
import { Song } from '.'
import { render, screen } from '@testing-library/react'

describe('Song', () => {
  it('Can render a song with a name', () => {
    render(<Song name="test name" artist="" cover="" />)
    const songName = screen.getByTestId('song-name')
    expect(songName).toHaveTextContent('test name')
  })
})
