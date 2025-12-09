# Code Improvements & Refactoring Suggestions

This document outlines code improvements focusing on DRY principles, modularity, and best practices identified in the PhysioCare React Native codebase.

---

## 1. Avatar Component - Multiple Implementations

### Problem

Avatar logic is implemented differently across multiple files with inconsistent behavior:

- **ProfileScreen.tsx** (line 55-58): Uses single letter from first character
- **ChatScreen.tsx** (line 67-74): Uses 2 letters from first letter of each word
- **HomeTabHeader.tsx** (line 16-23): Uses 2 letters with `getInitials()` function

### Files Affected

- `src/components/screens/ProfileScreen.tsx` (lines 55-58, 113-126)
- `src/components/screens/ChatScreen.tsx` (lines 67-74, 189-202)
- `src/components/ui-molecules/HomeTabHeader.tsx` (lines 16-23, 53-65)

### Proposed Solution

Create a reusable `Avatar` component:

**Create:** `src/components/ui-atoms/Avatar.tsx`

```tsx
interface AvatarProps {
  name: string;
  size?: number;
  backgroundColor?: string;
  textColor?: string;
  maxInitials?: number; // 1 or 2
}

export default function Avatar({
  name,
  size = 44,
  backgroundColor = "#007AFF",
  textColor = "#fff",
  maxInitials = 2,
}: AvatarProps) {
  const getInitials = (name: string, max: number) => {
    const parts = name.trim().split(" ").filter(Boolean);
    if (parts.length === 0) return "U";

    if (max === 1) {
      return parts[0][0].toUpperCase();
    }

    return parts
      .slice(0, max)
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .slice(0, max);
  };

  return (
    <View
      style={[
        styles.container,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor,
        },
      ]}
    >
      <Text
        style={[
          styles.text,
          {
            fontSize: size * 0.36,
            color: textColor,
          },
        ]}
      >
        {getInitials(name, maxInitials)}
      </Text>
    </View>
  );
}
```

**Usage:**

```tsx
// Single letter
<Avatar name={user?.name || 'User'} maxInitials={1} size={60} />

// Two letters (default)
<Avatar name={userName} size={44} />
```

---

## 2. Progress Bar Component - Duplicated Implementation

### Problem

Progress bars are implemented separately in multiple files with similar but not identical code:

- **GoalCard.tsx** (lines 24-33, 80-93): `progressBarContainer`, `progressBarBackground`, `progressBarFill`
- **GoalDetailsScreen.tsx** (lines 52-61, 175-188): Same structure but different height values
- **SessionCard.tsx** (lines 63-70, 137-148): Different structure (`progressBar`, `progressFill`)
- **RegimenTab.tsx** (lines 92-99, 206-216): Different structure (`progressBar`, `progressFill`)

### Files Affected

- `src/components/ui-molecules/GoalCard.tsx` (lines 24-33, 80-93)
- `src/components/screens/GoalDetailsScreen.tsx` (lines 52-61, 175-188)
- `src/components/ui-molecules/SessionCard.tsx` (lines 63-70, 137-148)
- `src/components/ui-molecules/RegimenTab.tsx` (lines 92-99, 206-216)

### Proposed Solution

Create a reusable `ProgressBar` component:

**Create:** `src/components/ui-atoms/ProgressBar.tsx`

```tsx
interface ProgressBarProps {
  progress: number; // 0-100
  height?: number;
  backgroundColor?: string;
  fillColor?: string;
  showLabel?: boolean;
  label?: string;
  borderRadius?: number;
}

export default function ProgressBar({
  progress,
  height = 8,
  backgroundColor = "#E5E5EA",
  fillColor = "#007AFF",
  showLabel = false,
  label,
  borderRadius = 4,
}: ProgressBarProps) {
  const clampedProgress = Math.min(100, Math.max(0, progress));

  return (
    <View>
      {showLabel && label && <Text style={styles.label}>{label}</Text>}
      <View
        style={[
          styles.container,
          {
            height,
            backgroundColor,
            borderRadius,
          },
        ]}
      >
        <View
          style={[
            styles.fill,
            {
              width: `${clampedProgress}%`,
              backgroundColor: fillColor,
              borderRadius,
            },
          ]}
        />
      </View>
    </View>
  );
}
```

**Usage:**

```tsx
// Simple progress bar
<ProgressBar progress={goal.progress} />

// With custom styling
<ProgressBar
  progress={75}
  height={12}
  fillColor="#34C759"
  showLabel
  label="75% completed"
/>

// In GoalCard
<ProgressBar progress={goal.progress} height={8} />

// In SessionCard
<ProgressBar
  progress={progressPercentage}
  height={4}
  fillColor="#34C759"
/>
```

---

## 3. Back Button Component - Inconsistent Implementation

### Problem

Back buttons are implemented differently across screens:

- **BookAppointmentScreen.tsx** (lines 52-58, 125-137): `← Back` text with container
- **VideoConsultationScreen.tsx** (lines 107-113, 206-218): Same pattern
- **GoalDetailsScreen.tsx** (lines 29-35, 135-147): Same pattern
- **ChatScreen.tsx** (lines 102-107, 148-155): Just `←` symbol
- **ClinicalRecordsScreen.tsx** (lines 24-29, 76-83): `‹` symbol
- **PaymentScreen.tsx** (lines 23-28, 111-118): `‹` symbol
- **PreviousTicketsScreen.tsx** (lines 106-111, 148-155): `←` symbol

### Files Affected

- `src/components/screens/BookAppointmentScreen.tsx` (lines 52-58, 125-137)
- `src/components/screens/VideoConsultationScreen.tsx` (lines 107-113, 206-218)
- `src/components/screens/GoalDetailsScreen.tsx` (lines 29-35, 135-147)
- `src/components/screens/ChatScreen.tsx` (lines 102-107, 148-155)
- `src/components/screens/ClinicalRecordsScreen.tsx` (lines 24-29, 76-83)
- `src/components/screens/PaymentScreen.tsx` (lines 23-28, 111-118)
- `src/components/screens/PreviousTicketsScreen.tsx` (lines 106-111, 148-155)

### Proposed Solution

Create a reusable `BackButton` component:

**Create:** `src/components/ui-atoms/BackButton.tsx`

```tsx
interface BackButtonProps {
  onPress: () => void;
  label?: string; // 'Back' or undefined for icon only
  icon?: "arrow" | "chevron"; // '←' or '‹'
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export default function BackButton({
  onPress,
  label = "Back",
  icon = "arrow",
  style,
  textStyle,
}: BackButtonProps) {
  const iconSymbol = icon === "chevron" ? "‹" : "←";

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, style]}
      activeOpacity={0.7}
    >
      <Text style={[styles.icon, textStyle]}>{iconSymbol}</Text>
      {label && <Text style={[styles.label, textStyle]}>{label}</Text>}
    </TouchableOpacity>
  );
}
```

**Usage:**

```tsx
// With label
<BackButton onPress={() => navigation.goBack()} label="Back" />

// Icon only
<BackButton onPress={() => navigation.goBack()} />

// Chevron style
<BackButton onPress={() => navigation.goBack()} icon="chevron" />
```

---

## 4. Screen Header Component - Duplicated Code

### Problem

Each screen implements its own header with similar but not identical code:

- **TimelineTab.tsx** (lines 67-69, 138-150): Header with title
- **ChatScreen.tsx** (lines 101-109, 136-160): Header with back button and title
- **PreviousTicketsScreen.tsx** (lines 105-113, 136-160): Header with back button and title
- **ClinicalRecordsScreen.tsx** (lines 23-31, 69-88): Header with back button and title
- **PaymentScreen.tsx** (lines 22-30, 104-123): Header with back button and title
- **BookAppointmentScreen.tsx** (lines 48-60, 118-142): Header with back button and title
- **VideoConsultationScreen.tsx** (lines 106-115, 199-223): Header with back button and title
- **GoalDetailsScreen.tsx** (lines 27-36, 132-147): Header with back button
- **SupportTab.tsx** (lines 40-45, 102-118): Header with greeting
- **RegimenTab.tsx** (lines 36-38, 125-134): Header with title

### Files Affected

- All screen components listed above

### Proposed Solution

Create reusable `ScreenHeader` component:

**Create:** `src/components/ui-molecules/ScreenHeader.tsx`

```tsx
interface ScreenHeaderProps {
  title?: string;
  showBackButton?: boolean;
  onBackPress?: () => void;
  rightComponent?: React.ReactNode;
  subtitle?: string;
  paddingTop?: number;
}

export default function ScreenHeader({
  title,
  showBackButton = false,
  onBackPress,
  rightComponent,
  subtitle,
  paddingTop = 40,
}: ScreenHeaderProps) {
  return (
    <View style={[styles.container, { paddingTop }]}>
      <View style={styles.content}>
        {showBackButton && onBackPress && <BackButton onPress={onBackPress} />}
        <View style={styles.titleContainer}>
          {title && <Text style={styles.title}>{title}</Text>}
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
        {rightComponent && <View style={styles.right}>{rightComponent}</View>}
      </View>
    </View>
  );
}
```

**Usage:**

```tsx
// Simple header with title
<ScreenHeader title="My Appointments" />

// With back button
<ScreenHeader
  title="Clinical Records"
  showBackButton
  onBackPress={() => navigation.goBack()}
/>

// With subtitle
<ScreenHeader
  title="How can we help you, John?"
  subtitle="We're here to support your physiotherapy journey"
/>
```

---

## 5. Tab Component - Duplicated Implementation

### Problem

Tabs are implemented separately in multiple screens with similar code:

- **HomeTabMain.tsx** (lines 54-81, 137-165): Custom tab implementation
- **TimelineTab.tsx** (lines 82-100, 165-188): Custom tab implementation with counts
- **RegimenTab.tsx** (lines 41-61, 135-163): Custom tab implementation

### Files Affected

- `src/components/screens/HomeTabMain.tsx` (lines 54-81, 137-165)
- `src/components/screens/TimelineTab.tsx` (lines 82-100, 165-188)
- `src/components/ui-molecules/RegimenTab.tsx` (lines 41-61, 135-163)

### Proposed Solution

Create a reusable `TabGroup` component:

**Create:** `src/components/ui-molecules/TabGroup.tsx`

```tsx
interface Tab {
  key: string;
  label: string;
  count?: number;
}

interface TabGroupProps<T extends string> {
  tabs: Tab[];
  activeTab: T;
  onTabChange: (tab: T) => void;
  showCounts?: boolean;
}

export default function TabGroup<T extends string>({
  tabs,
  activeTab,
  onTabChange,
  showCounts = false,
}: TabGroupProps<T>) {
  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.key}
          style={[styles.tab, activeTab === tab.key && styles.activeTab]}
          onPress={() => onTabChange(tab.key as T)}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === tab.key && styles.activeTabText,
            ]}
          >
            {tab.label}
            {showCounts && tab.count !== undefined && ` (${tab.count})`}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
```

**Usage:**

```tsx
// Simple tabs
<TabGroup
  tabs={[
    { key: 'active', label: 'Active' },
    { key: 'completed', label: 'Completed' }
  ]}
  activeTab={activeTab}
  onTabChange={setActiveTab}
/>

// With counts
<TabGroup
  tabs={[
    { key: 'upcoming', label: 'Upcoming', count: 5 },
    { key: 'completed', label: 'Completed', count: 12 }
  ]}
  activeTab={activeTab}
  onTabChange={setActiveTab}
  showCounts
/>
```

---

## 6. Container Styles - Duplicated Across Screens

### Problem

Container and background styles are repeated across multiple screens:

- Most screens use: `flex: 1, backgroundColor: '#f5f5f5'` or `'#f8f9fa'` or `'#fff'`
- ScrollView containers have similar padding and styling

### Files Affected

- All screen components

### Proposed Solution

Create shared style constants:

**Create:** `src/styles/common.ts`

```tsx
import { StyleSheet } from "react-native";

export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  containerWhite: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  screenPadding: {
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 12,
  },
});
```

**Usage:**

```tsx
import { commonStyles } from "../../styles/common";

<ScrollView
  style={commonStyles.container}
  contentContainerStyle={commonStyles.scrollContainer}
>
  <View style={commonStyles.card}>{/* content */}</View>
</ScrollView>;
```

---

## 7. Status Badge Component - Duplicated Logic

### Problem

Status badges with color logic are implemented in multiple places:

- **SessionCard.tsx** (lines 19-26, 53-55): `getStatusColor()` function
- **AppointmentDetailsSheet.tsx** (lines 35-42, 100-102): `getStatusColor()` function
- **ClinicalRecordsScreen.tsx** (line 42): Inline color logic
- **RegimenTab.tsx** (lines 74-79): Inline color logic
- **PreviousTicketsScreen.tsx** (lines 28-39, 41-52): `getStatusColor()` and `getPriorityColor()`

### Files Affected

- `src/components/ui-molecules/SessionCard.tsx`
- `src/components/ui-molecules/AppointmentDetailsSheet.tsx`
- `src/components/screens/ClinicalRecordsScreen.tsx`
- `src/components/ui-molecules/RegimenTab.tsx`
- `src/components/screens/PreviousTicketsScreen.tsx`

### Proposed Solution

Create reusable `StatusBadge` component and utility:

**Create:** `src/utils/statusColors.ts`

```tsx
export const getStatusColor = (status: string): string => {
  const statusMap: Record<string, string> = {
    upcoming: "#007AFF",
    completed: "#34C759",
    cancelled: "#FF3B30",
    "in-progress": "#FF9500",
    "not-started": "#8E8E93",
    open: "#34C759",
    closed: "#8E8E93",
    pending: "#FF9500",
  };
  return statusMap[status.toLowerCase()] || "#8E8E93";
};

export const getPriorityColor = (priority: string): string => {
  const priorityMap: Record<string, string> = {
    high: "#FF3B30",
    medium: "#FF9500",
    low: "#34C759",
  };
  return priorityMap[priority.toLowerCase()] || "#8E8E93";
};
```

**Create:** `src/components/ui-atoms/StatusBadge.tsx`

```tsx
import { getStatusColor } from "../../utils/statusColors";

interface StatusBadgeProps {
  status: string;
  customColor?: string;
  size?: "small" | "medium";
}

export default function StatusBadge({
  status,
  customColor,
  size = "medium",
}: StatusBadgeProps) {
  const color = customColor || getStatusColor(status);
  const fontSize = size === "small" ? 10 : 12;
  const padding = size === "small" ? 4 : 8;

  return (
    <View
      style={[
        styles.badge,
        { backgroundColor: color, paddingHorizontal: padding },
      ]}
    >
      <Text style={[styles.text, { fontSize }]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Text>
    </View>
  );
}
```

**Usage:**

```tsx
<StatusBadge status={session.status} />
<StatusBadge status="completed" size="small" />
```

---

## 8. Search Input Component - Duplicated Code

### Problem

Search input fields are implemented separately in multiple screens:

- **TimelineTab.tsx** (lines 72-79, 151-164): Search input
- **ChatScreen.tsx** (lines 111-118, 161-172): Search input
- **LocationSelector.tsx** (lines 122-128, 220-229): Search input

### Files Affected

- `src/components/screens/TimelineTab.tsx` (lines 72-79, 151-164)
- `src/components/screens/ChatScreen.tsx` (lines 111-118, 161-172)
- `src/components/ui-molecules/LocationSelector.tsx` (lines 122-128, 220-229)

### Proposed Solution

Create reusable `SearchInput` component:

**Create:** `src/components/ui-atoms/SearchInput.tsx`

```tsx
interface SearchInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  style?: ViewStyle;
}

export default function SearchInput({
  value,
  onChangeText,
  placeholder = "Search...",
  style,
}: SearchInputProps) {
  return (
    <TextInput
      style={[styles.input, style]}
      placeholder={placeholder}
      placeholderTextColor="#999"
      value={value}
      onChangeText={onChangeText}
    />
  );
}
```

**Usage:**

```tsx
<SearchInput
  value={searchQuery}
  onChangeText={setSearchQuery}
  placeholder="Search conversations..."
/>
```

---

## 9. Empty State Component - Duplicated Code

### Problem

Empty state views are implemented separately in multiple screens:

- **HomeTabMain.tsx** (lines 94-98, 169-176): Empty state for goals
- **TimelineTab.tsx** (lines 109-120, 192-209): Empty state for sessions
- **RegimenTab.tsx** (lines 109-114, 221-228): Empty state for regimens

### Files Affected

- `src/components/screens/HomeTabMain.tsx` (lines 94-98, 169-176)
- `src/components/screens/TimelineTab.tsx` (lines 109-120, 192-209)
- `src/components/ui-molecules/RegimenTab.tsx` (lines 109-114, 221-228)
- `src/components/screens/PreviousTicketsScreen.tsx` (lines 121-125, 228-238)

### Proposed Solution

Create reusable `EmptyState` component:

**Create:** `src/components/ui-molecules/EmptyState.tsx`

```tsx
interface EmptyStateProps {
  title: string;
  subtitle?: string;
  icon?: string;
}

export default function EmptyState({ title, subtitle, icon }: EmptyStateProps) {
  return (
    <View style={styles.container}>
      {icon && <Text style={styles.icon}>{icon}</Text>}
      <Text style={styles.title}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  );
}
```

**Usage:**

```tsx
<EmptyState
  title="No active goals yet"
  subtitle="Start by creating your first goal"
/>

<ListEmptyComponent={
  <EmptyState
    title={`No ${activeTab} appointments found`}
    subtitle={searchQuery ? "Try adjusting your search terms" : undefined}
  />
}
```

---

## 10. Button Component - Duplicated Styles

### Problem

Primary buttons are styled similarly across multiple screens but not reused:

- **LoginScreen.tsx** (lines 49-51, 87-97): Primary button
- **OTPScreen.tsx** (lines 59-61, 99-109): Primary button
- **UserDetailsScreen.tsx** (lines 177-179, 235-247): Primary button
- **BookAppointmentScreen.tsx** (lines 78-94, 148-164): Primary button
- **VideoConsultationScreen.tsx** (lines 173-187, 353-369): Primary button

### Files Affected

- Multiple screen components

### Proposed Solution

Create reusable `Button` component:

**Create:** `src/components/ui-atoms/Button.tsx`

```tsx
interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "danger";
  disabled?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
}

export default function Button({
  title,
  onPress,
  variant = "primary",
  disabled = false,
  fullWidth = true,
  style,
}: ButtonProps) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        styles[variant],
        disabled && styles.disabled,
        fullWidth && styles.fullWidth,
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <Text
        style={[
          styles.text,
          styles[`${variant}Text`],
          disabled && styles.disabledText,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}
```

**Usage:**

```tsx
<Button title="Send OTP" onPress={handleSendOTP} />
<Button title="Logout" onPress={handleLogout} variant="danger" />
<Button title="Save" onPress={handleSave} disabled={!isValid} />
```

---

## Implementation Priority

### High Priority (Immediate Impact)

1. ✅ **Avatar Component** - Used in 3+ places, inconsistent behavior
2. ✅ **Progress Bar Component** - Used in 4+ places, visual inconsistency
3. ✅ **Back Button Component** - Used in 7+ places, inconsistent UX
4. ✅ **Screen Header Component** - Used in 10+ places, major duplication

### Medium Priority (Code Quality)

5. ✅ **Tab Component** - Used in 3 places, similar logic
6. ✅ **Status Badge Component** - Used in 5+ places, duplicated color logic
7. ✅ **Button Component** - Used in 5+ places, style duplication

### Low Priority (Nice to Have)

8. ✅ **Search Input Component** - Used in 3 places
9. ✅ **Empty State Component** - Used in 4 places
10. ✅ **Common Styles** - Reduces duplication but less critical

---

## File Structure Recommendation

After refactoring, the component structure should be:

```
src/
├── components/
│   ├── ui-atoms/          # Basic reusable components
│   │   ├── Avatar.tsx
│   │   ├── BackButton.tsx
│   │   ├── Button.tsx
│   │   ├── ProgressBar.tsx
│   │   ├── SearchInput.tsx
│   │   └── StatusBadge.tsx
│   ├── ui-molecules/      # Composite components
│   │   ├── ScreenHeader.tsx
│   │   ├── TabGroup.tsx
│   │   └── EmptyState.tsx
│   └── screens/           # Screen components
├── styles/
│   └── common.ts          # Shared styles
└── utils/
    └── statusColors.ts    # Status color utilities
```

---

## Benefits of Refactoring

1. **Consistency**: Unified UI components ensure consistent user experience
2. **Maintainability**: Changes to common components propagate automatically
3. **DRY Principle**: Eliminates code duplication
4. **Testability**: Isolated components are easier to test
5. **Reusability**: Components can be used in future features
6. **Performance**: Smaller bundle size due to code reuse
7. **Developer Experience**: Easier to understand and modify codebase

---

## Migration Strategy

1. **Phase 1**: Create new components in `ui-atoms` and `ui-molecules` folders
2. **Phase 2**: Update one screen at a time, starting with most duplicated patterns
3. **Phase 3**: Remove old implementations after all screens are migrated
4. **Phase 4**: Add TypeScript types and prop validation
5. **Phase 5**: Add unit tests for reusable components

---

## Notes

- All proposed components should follow TypeScript best practices
- Consider adding Storybook for component documentation
- Ensure accessibility (a11y) props are included in all components
- Maintain backward compatibility during migration
- Update existing tests to work with new components
