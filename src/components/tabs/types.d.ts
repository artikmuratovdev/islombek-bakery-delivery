export interface Props {
  tabs: { label: string; value: string }[];
  activeTab: string;
  onTabChange: (tab: string) => void;
}
