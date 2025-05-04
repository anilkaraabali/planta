import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import { ReviewCard } from '../ReviewsCard';
import { Review } from '../types';

const mockReview: Review = {
  content:
    'This is a long review content that exceeds 128 characters. This content will be cropped when displayed in the ReviewCard component, and can be expanded when the user clicks "Show more". It provides more details about the product and user experience.',
  createdAt: '2025-03-06T12:30:00Z',
  id: '1',
  rating: 4,
  userId: 'user-123',
};

describe('ReviewCard', () => {
  test('should render truncated content when disableToggle is false and content exceeds maxLength', () => {
    render(
      <ReviewCard disableToggle={false} maxLength={128} review={mockReview} />
    );

    expect(
      screen.getByText(
        /This is a long review content that exceeds 128 characters. This content will be cropped when displayed in the ReviewCard.../
      )
    ).toBeInTheDocument();
    expect(screen.getByText('cta.showMore')).toBeInTheDocument();
  });

  test('should render full content when disableToggle is true', () => {
    render(
      <ReviewCard disableToggle={true} maxLength={128} review={mockReview} />
    );

    expect(screen.getByText(mockReview.content)).toBeInTheDocument();
    expect(screen.queryByText('cta.showMore')).not.toBeInTheDocument();
  });

  test('should toggle content when clicking "Show more" button', () => {
    render(
      <ReviewCard disableToggle={false} maxLength={128} review={mockReview} />
    );

    expect(
      screen.getByText(
        /This is a long review content that exceeds 128 characters. This content will be cropped when displayed in the ReviewCard.../
      )
    ).toBeInTheDocument();

    fireEvent.click(screen.getByText('cta.showMore'));

    expect(screen.getByText(mockReview.content)).toBeInTheDocument();
    expect(screen.getByText('cta.showLess')).toBeInTheDocument();
  });

  test('should hide toggle button when content is within maxLength', () => {
    const shortReview = {
      ...mockReview,
      content: 'Short review content',
    };

    render(
      <ReviewCard disableToggle={false} maxLength={128} review={shortReview} />
    );

    expect(screen.queryByText('cta.showMore')).not.toBeInTheDocument();
    expect(screen.getByText(shortReview.content)).toBeInTheDocument();
  });

  test('should not render "Show more" button when disableToggle is true', () => {
    render(
      <ReviewCard disableToggle={true} maxLength={128} review={mockReview} />
    );

    expect(screen.queryByText('cta.showMore')).not.toBeInTheDocument();
  });
});
