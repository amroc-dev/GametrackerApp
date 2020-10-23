
import { lighten } from 'polished'

const background2 = 'rgb(78, 94, 108)';
const fontSize = 18;
const rem = 18; //fontSize;

// $gt_font_multiplier: 1.05;
// $gt_primarybold_font_size: 1rem * $gt_font_multiplier;
// $gt_primary_font_size: 1rem * $gt_font_multiplier;
// $gt_primary2_font_size: 0.9rem * $gt_font_multiplier;
// $gt_secondary_font_size: 0.7rem * $gt_font_multiplier;
// $gt_mini_font_size: 0.65rem * $gt_font_multiplier;
// $gt_rating_font_size: 1.2rem * $gt_font_multiplier;

const theme = {
 rem: rem, 
  
 colors : {
    primary: "rgb(26, 155, 215)",
    background1: "rgb(42, 63, 78)",
    background2: background2,
    secondary: (lighten('0.25', background2)),
  },

  fonts : {
      colors : {
        title: "rgb(255, 255, 255)",
        primary: "rgb(234, 234, 234)",
        secondary: "rgb(150, 158, 166)",
      },

      sizes : {
        primaryBold: 1 * fontSize,
        primary: 1 * fontSize,
        primary2: 0.9 * fontSize,
        secondary: 0.7 * fontSize,
        rating: 1.2 * fontSize,
      },
  },

  borderRadius: 6,
};

export default theme;
