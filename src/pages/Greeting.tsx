// Hooks
import {
    useNavigation
} from '@react-navigation/native'
// Components
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image
} from 'react-native'

export default function OnboardingScreen() {
  const navigation = useNavigation()
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Image
          // source={require('../assets/privacy.png')} // ضع هنا أيقونة مناسبة
          source={{uri: 'https://companieslogo.com/img/orig/5110.SR-239ac14d.png?t=1746773002'}} // ضع هنا أيقونة مناسبة
          style={styles.icon}
        />
      </View>

      <Text style={styles.title}>تطبيق SEC Store يرحّب بك</Text>
      <Text style={styles.subtitle}>
        نقدّم لك تجربة تسوّق ذكية للمنتجات الكهربائية المعتمدة من الشركة السعودية للكهرباء.
يمكنك استعراض أجهزة موثوقة، عالية الكفاءة، مع إمكانية الشراء بالتقسيط عبر فاتورة الكهرباء بكل سهولة وأمان.
      </Text>

      <Text style={styles.note}>
        تنويه: هذه النسخة من التطبيق تجريبية وتهدف لعرض واجهة الاستخدام فقط،
وقد لا تتوفر جميع المميزات أو المنتجات بشكل فعلي في الوقت الحالي.
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.replace('main')} // بعد الضغط ينتقل للتطبيق
      >
        <Text style={styles.buttonText}>متابعة</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#555',
    marginBottom: 30,
    lineHeight: 24,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  icon: {
    width: 100,
    height: 100,
    objectFit: 'contain'
  },
  note: {
    textAlign: 'center',
    color: '#666',
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    borderRadius: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '600',
  },
})
