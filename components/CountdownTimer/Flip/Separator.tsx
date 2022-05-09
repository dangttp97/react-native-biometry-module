import { PureComponent } from 'react'
import { StyleSheet, View } from 'react-native'

export class Separator extends PureComponent {
  render() {
    return (
      <View style={styles.separator}>
        <View style={styles.circle} />
        <View style={styles.circle} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  separator: {
    marginHorizontal: 5,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  circle: { height: 5, width: 5, borderRadius: 5, backgroundColor: '#333333' },
})
