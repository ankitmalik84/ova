import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register the plugin if not already done
gsap.registerPlugin(ScrollTrigger);

class AnimationManager {
  private static activeAnimations: (gsap.core.Tween | gsap.core.Timeline)[] = [];
  private static activeScrollTriggers: ScrollTrigger[] = [];
  private static MAX_ANIMATIONS = 5; // Set your maximum limit here
  static activeSection: string = "Home";

  // Method to add Tween animations
  static addAnimation(animation: gsap.core.Tween | gsap.core.Timeline) {
    try {
      if (!animation) {
        // console.warn("Attempted to add an invalid animation.");
        return;
      }

      if (this.activeAnimations.length >= this.MAX_ANIMATIONS) {
        this.removeOldestAnimation();
      }
      this.activeAnimations.push(animation);
      console.log(`Added animation. Active animations: ${this.activeAnimations.length}`);
    } catch (error) {
      console.error("Failed to add animation:", error);
    }
  }

  // Method to add ScrollTrigger animations
  static addScrollTrigger(trigger: ScrollTrigger) {
    try {
      if (!trigger) {
        console.warn("Attempted to add an invalid scroll trigger.");
        return;
      }

      if (this.activeScrollTriggers.length >= this.MAX_ANIMATIONS) {
        this.removeOldestScrollTrigger();
      }
      this.activeScrollTriggers.push(trigger);
      console.log(`Added scroll trigger. Active scroll triggers: ${this.activeScrollTriggers.length}`);
    } catch (error) {
      console.error("Failed to add scroll trigger:", error);
    }
  }

  static removeAnimation(animation: gsap.core.Tween | gsap.core.Timeline) {
    try {
      const index = this.activeAnimations.indexOf(animation);
      if (index > -1) {
        this.activeAnimations.splice(index, 1);
        (animation as gsap.core.Tween).kill?.(); // Ensure animation is killed if it's a Tween
        console.log(`Removed animation. Active animations: ${this.activeAnimations.length}`);
      }
    } catch (error) {
      console.error("Failed to remove animation:", error);
    }
  }

  static removeScrollTrigger(trigger: ScrollTrigger) {
    try {
      const index = this.activeScrollTriggers.indexOf(trigger);
      if (index > -1) {
        this.activeScrollTriggers.splice(index, 1);
        trigger.kill(); // Ensure trigger is killed
        console.log(`Removed scroll trigger. Active scroll triggers: ${this.activeScrollTriggers.length}`);
      }
    } catch (error) {
      console.error("Failed to remove scroll trigger:", error);
    }
  }

  private static removeOldestAnimation() {
    try {
      const oldest = this.activeAnimations.shift();
      if (oldest) {
        (oldest as gsap.core.Tween).kill?.(); // Stop the oldest animation if it's a Tween
        console.log(`Removed oldest animation. Active animations: ${this.activeAnimations.length}`);
      }
    } catch (error) {
      console.error("Failed to remove the oldest animation:", error);
    }
  }

  private static removeOldestScrollTrigger() {
    try {
      const oldest = this.activeScrollTriggers.shift();
      if (oldest) {
        oldest.kill(); // Stop the oldest scroll trigger
        console.log(`Removed oldest scroll trigger. Active scroll triggers: ${this.activeScrollTriggers.length}`);
      }
    } catch (error) {
      console.error("Failed to remove the oldest scroll trigger:", error);
    }
  }

  static stopAllAnimations() {
    try {
      // Stop all active tweens
      this.activeAnimations.forEach((animation) => {
        (animation as gsap.core.Tween).pause?.(); // Pause the tween if applicable
      });
      // Stop all active scroll triggers
      this.activeScrollTriggers.forEach((trigger) => {
        trigger.disable(); // Disable the scroll trigger without killing it
      });

      // console.log("Stopped all animations.");
    } catch (error) {
      console.error("Failed to stop all animations:", error);
    }
  }
}

export default AnimationManager;
