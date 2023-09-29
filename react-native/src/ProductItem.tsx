import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { useState } from "react";

type ProductItemProps = {
  record: {
    createdTime: string;
    fields: {
      Posted: string;
      "Product Categories"?: string;
      "Product Code"?: string;
      "Product Image"?: string;
      "Product Name"?: string;
    };
    id: string;
  };
};

export default ({ record }: ProductItemProps) => {
  const tags = record.fields["Product Categories"]?.split(/,|  /);
  const [expanded, setExpanded] = useState(false);

  const isNew = () => {
    const sevenDaysAgo: Date = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

    const recordDate: Date = new Date(record.fields.Posted);
    if (sevenDaysAgo < recordDate) {
      return true;
    }
    return false;
  };

  return (
    <View style={styles.productCard}>
      <Image
        source={
          record.fields["Product Image"]
            ? {
                uri: record.fields["Product Image"]
              }
            : require("../assets/img-placeholder.png")
        }
        style={{ width: 85, height: expanded ? 113 : 64 }}
        resizeMode="contain"
      />
      <View style={{ flex: 1, gap: 12 }}>
        <View style={{ gap: 2 }}>
          <View style={styles.topRow}>
            <Text
              style={styles.header}
              numberOfLines={expanded ? undefined : 1}
            >
              {record.fields["Product Name"]}
            </Text>
            {isNew() && (
              <View style={styles.new}>
                <Text style={{ color: "#ffffff" }}>NEW</Text>
              </View>
            )}
            <TouchableOpacity
              onPress={() => {
                setExpanded(!expanded);
              }}
            >
              <Image
                source={
                  expanded
                    ? require("../assets/chevron-up.png")
                    : require("../assets/chevron-down.png")
                }
                style={{ width: 24, height: 24 }}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.date}>
            {new Date(record.fields.Posted)
              .toLocaleDateString()
              .replaceAll("/", ".")}
          </Text>
        </View>
        {expanded && (
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 6 }}>
            {tags?.map((tag: string, index: number) => {
              return (
                <View key={index} style={styles.tag}>
                  <Text style={styles.tagText}>{tag.trim()}</Text>
                </View>
              );
            })}
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  new: {
    backgroundColor: "#333333",
    width: 53,
    height: 26,
    borderTopLeftRadius: 9,
    borderBottomLeftRadius: 9,
    borderBottomRightRadius: 9,
    justifyContent: "center",
    alignItems: "center"
  },
  tag: {
    backgroundColor: "#d4e5ff",
    borderRadius: 48,
    paddingHorizontal: 12,
    paddingVertical: 2
  },
  productCard: {
    borderRadius: 4,
    padding: 8,
    backgroundColor: "#F8F9FC",
    flexDirection: "row",
    gap: 12,
    shadowColor: "#b2633",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 2,
    marginHorizontal: 2
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12
  },
  header: {
    fontWeight: "900",
    fontSize: 20,
    flex: 1,
    lineHeight: 22
  },
  date: {
    fontWeight: "400",
    fontSize: 12,
    lineHeight: 16
  },
  tagText: {
    fontWeight: "400",
    fontSize: 12,
    lineHeight: 22,
    flex: 1,
    flexWrap: "wrap"
  }
});
