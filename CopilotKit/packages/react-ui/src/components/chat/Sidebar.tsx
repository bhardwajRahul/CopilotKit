/**
 * <br/>
 * <img src="https://cdn.copilotkit.ai/docs/copilotkit/images/CopilotSidebar.gif" width="500" />
 *
 * A chatbot sidebar component for the CopilotKit framework. Highly customizable through various props and custom CSS.
 *
 * See [CopilotPopup](/reference/components/chat/CopilotPopup) for a popup version of this component.
 *
 * ## Install Dependencies
 *
 * This component is part of the [@copilotkit/react-ui](https://npmjs.com/package/@copilotkit/react-ui) package.
 *
 * ```shell npm2yarn \"@copilotkit/react-ui"\
 * npm install @copilotkit/react-core @copilotkit/react-ui
 * ```
 *
 * ## Usage
 *
 * ```tsx
 * import { CopilotSidebar } from "@copilotkit/react-ui";
 * import "@copilotkit/react-ui/styles.css";
 *
 * <CopilotSidebar
 *   labels={{
 *     title: "Your Assistant",
 *     initial: "Hi! 👋 How can I assist you today?",
 *   }}
 * >
 *   <YourApp/>
 * </CopilotSidebar>
 * ```
 *
 * ### With Observability Hooks
 *
 * To monitor user interactions, provide the `observabilityHooks` prop.
 * **Note:** This requires a `publicApiKey` in the `<CopilotKit>` provider.
 *
 * ```tsx
 * <CopilotKit publicApiKey="YOUR_PUBLIC_API_KEY">
 *   <CopilotSidebar
 *     observabilityHooks={{
 *       onChatExpanded: () => {
 *         console.log("Sidebar opened");
 *       },
 *       onChatMinimized: () => {
 *         console.log("Sidebar closed");
 *       },
 *     }}
 *   >
 *     <YourApp/>
 *   </CopilotSidebar>
 * </CopilotKit>
 * ```
 *
 * ### Look & Feel
 *
 * By default, CopilotKit components do not have any styles. You can import CopilotKit's stylesheet at the root of your project:
 * ```tsx title="YourRootComponent.tsx"
 * ...
 * import "@copilotkit/react-ui/styles.css"; // [!code highlight]
 *
 * export function YourRootComponent() {
 *   return (
 *     <CopilotKit>
 *       ...
 *     </CopilotKit>
 *   );
 * }
 * ```
 * For more information about how to customize the styles, check out the [Customize Look & Feel](/guides/custom-look-and-feel/customize-built-in-ui-components) guide.
 */
import React, { useState } from "react";
import { CopilotModal, CopilotModalProps } from "./Modal";

export function CopilotSidebar(props: CopilotModalProps) {
  props = {
    ...props,
    className: props.className ? props.className + " copilotKitSidebar" : "copilotKitSidebar",
  };
  const [expandedClassName, setExpandedClassName] = useState(
    props.defaultOpen ? "sidebarExpanded" : "",
  );

  const onSetOpen = (open: boolean) => {
    props.onSetOpen?.(open);
    setExpandedClassName(open ? "sidebarExpanded" : "");
  };

  return (
    <div className={`copilotKitSidebarContentWrapper ${expandedClassName}`}>
      <CopilotModal {...props} {...{ onSetOpen }}>
        {props.children}
      </CopilotModal>
    </div>
  );
}
