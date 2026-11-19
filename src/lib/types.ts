import type { ComponentProps } from 'react';
import type { View } from 'react-native';

/** The exact style prop type accepted by <View> (avoids ViewStyle/StyleProp drift across RN versions). */
export type ViewStyleProp = ComponentProps<typeof View>['style'];
