Accessibility checklist for TimeKeeper

High priority

- [ ] Add `accessibilityLabel` and `accessibilityRole` for all interactive controls (buttons, icon buttons, touchables)
- [ ] Ensure modals set `accessibilityViewIsModal` and announce when opened
- [ ] Ensure touch targets >= 44x44 dp or add `hitSlop` to small icons
- [ ] Add keyboard focus styles (where applicable) and verify focus order

Medium priority

- [ ] Add `accessibilityHint` where actions are not obvious
- [ ] Use `accessibilityLiveRegion='polite'` or `AccessibilityInfo.announceForAccessibility` for live updates
- [ ] Provide text alternatives for icons (labels or hidden text)

Low priority / Visual

- [ ] Audit color contrast for small text (WCAG 2.1 AA: 4.5:1)
- [ ] Increase font sizes or contrast for vulnerable text elements

Testing

- [ ] Add automated accessibility tests (react-native-testing-library)
- [ ] Integrate tests into CI

Notes

- This checklist complements the code changes in the repository which add basic labels and modal accessibility.
- Manual testing with VoiceOver (iOS) and TalkBack (Android) is recommended after code changes.
