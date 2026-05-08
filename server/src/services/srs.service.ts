import { addDays, addHours } from 'date-fns';

/**
 * Mastery Levels:
 * 0: New / Just started
 * 1: Learning (Easy)
 * 2: Learning (Medium)
 * 3: Proficient
 * 4: Strong
 * 5: Mastered
 */

export class SRSService {
  /**
   * Calculate the next review date based on current mastery level and performance
   * @param currentLevel Current mastery level (0-5)
   * @param isCorrect Whether the user got the answer right
   * @returns { nextLevel: number, nextReviewDate: Date }
   */
  static calculateNextReview(currentLevel: number, isCorrect: boolean): { nextLevel: number, nextReviewDate: Date } {
    let nextLevel = currentLevel;
    let nextReviewDate = new Date();

    if (isCorrect) {
      // Improve level if correct
      nextLevel = Math.min(currentLevel + 1, 5);
      
      switch (nextLevel) {
        case 1:
          nextReviewDate = addDays(new Date(), 1); // 1 day
          break;
        case 2:
          nextReviewDate = addDays(new Date(), 3); // 3 days
          break;
        case 3:
          nextReviewDate = addDays(new Date(), 7); // 7 days
          break;
        case 4:
          nextReviewDate = addDays(new Date(), 14); // 14 days
          break;
        case 5:
          nextReviewDate = addDays(new Date(), 30); // 30 days
          break;
        default:
          nextReviewDate = addHours(new Date(), 4); // Backup
      }
    } else {
      // Reset or decrease level if incorrect
      // Common SRS practice: go back to a lower level or level 1
      nextLevel = Math.max(currentLevel - 1, 1);
      
      // If wrong, review again very soon
      nextReviewDate = addHours(new Date(), 1); // Review in 1 hour
    }

    return { nextLevel, nextReviewDate };
  }

  /**
   * Get words that are due for review for a specific user
   */
  static getDueIntervalQuery(userId: string) {
    return {
      where: {
        userId,
        nextReviewAt: {
          lte: new Date(), // Due now or in the past
        },
      },
      include: {
        word: true,
      },
      orderBy: {
        nextReviewAt: 'asc',
      },
    };
  }
}
